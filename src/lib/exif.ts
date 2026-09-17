/**
 * Hafif, bagimliliksiz bir JPEG EXIF ayristirici.
 * Tiff yapisini (II/MM endian) ve ortak etiketleri okur; maksat gizlilik
 * aracinin konum, cihaz ve tarih gibi verileri goruntuleyebilmesidir.
 * Tumu client-side'ta calisir.
 */

export type ExifData = {
  make?: string;
  model?: string;
  dateTime?: string;
  software?: string;
  orientation?: number;
  imageDescription?: string;
  /** DMS formatinda koordinatlar + referans harf */
  latitude?: { ref: string; degrees: number; minutes: number; seconds: number };
  longitude?: { ref: string; degrees: number; minutes: number; seconds: number };
  iso?: number;
  fNumber?: number;
  exposureTime?: number;
  focalLength?: number;
  valid: boolean;
};

type Reader = {
  u8: (o: number) => number;
  u16: (o: number) => number;
  u32: (o: number) => number;
  ascii: (o: number, len: number) => string;
  rational: (o: number) => number;
};

function makeReader(buf: ArrayBuffer, littleEndian: boolean): Reader {
  const dv = new DataView(buf);
  return {
    u8: (o) => dv.getUint8(o),
    u16: (o) => dv.getUint16(o, littleEndian),
    u32: (o) => dv.getUint32(o, littleEndian),
    ascii: (o, len) => {
      let s = '';
      for (let i = 0; i < len; i++) {
        const c = dv.getUint8(o + i);
        if (c === 0) break;
        s += String.fromCharCode(c);
      }
      return s.trim();
    },
    rational: (o) => {
      const num = dv.getUint32(o, littleEndian);
      const den = dv.getUint32(o + 4, littleEndian);
      return den === 0 ? 0 : num / den;
    },
  };
}

// IFD etiketi, tip ve deger uzunlugu (bayt)
type IfdEntry = {
  tag: number;
  type: number;
  count: number;
  valueOffset: number;
  nBytes: number;
};

const TYPE_SIZE: Record<number, number> = {
  1: 1, // BYTE
  2: 1, // ASCII
  3: 2, // SHORT
  4: 4, // LONG
  5: 8, // RATIONAL
  7: 1, // UNDEFINED
  9: 4, // SLONG
  10: 8, // SRATIONAL
};

function parseIFD(reader: Reader, offset: number): IfdEntry[] {
  const count = reader.u16(offset);
  const entries: IfdEntry[] = [];
  const start = offset + 2;
  const end = offset + 2 + count * 12;
  for (let i = 0; i < count; i++) {
    const e = start + i * 12;
    if (e + 12 > end) break;
    const type = reader.u16(e + 2);
    const n = reader.u32(e + 4);
    const size = TYPE_SIZE[type] ?? 1;
    const nBytes = n * size;
    const valueOffset = nBytes > 4 ? reader.u32(e + 8) : e + 8;
    entries.push({ tag: reader.u16(e), type, count: n, valueOffset, nBytes });
  }
  return entries;
}

function readAscii(reader: Reader, entry: IfdEntry): string | undefined {
  return reader.ascii(entry.valueOffset, entry.count);
}

function readShort(reader: Reader, entry: IfdEntry): number | undefined {
  return reader.u16(entry.valueOffset);
}

/** DMS(format: rational x 3) koordinatini okur */
function readCoord(
  reader: Reader,
  entry: IfdEntry,
  ref: string | undefined
): { ref: string; degrees: number; minutes: number; seconds: number } | undefined {
  if (entry.count < 3) return undefined;
  return {
    ref: ref ?? '',
    degrees: reader.rational(entry.valueOffset),
    minutes: reader.rational(entry.valueOffset + 8),
    seconds: reader.rational(entry.valueOffset + 16),
  };
}

export function parseExif(buffer: ArrayBuffer): ExifData {
  const bytes = new Uint8Array(buffer);
  const result: ExifData = { valid: false };

  // JPEG SOI ile baslamali (FF D8)
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return result;

  let offset = 2;
  let exifOffset = -1;

  // APP segmentlerini tara; EXIF'i iceren APP1'i bul (FF E1 "Exif\0\0")
  while (offset + 4 < bytes.length) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];
    if (marker === 0xd8 || marker === 0xd9) break; // SOI / EOI
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (marker === 0xe1) {
      // "Exif\0\0" imzasi
      if (
        bytes[offset + 4] === 0x45 &&
        bytes[offset + 5] === 0x78 &&
        bytes[offset + 6] === 0x69 &&
        bytes[offset + 7] === 0x66 &&
        bytes[offset + 8] === 0x00 &&
        bytes[offset + 9] === 0x00
      ) {
        exifOffset = offset + 10;
        break;
      }
    }
    if (length < 2) break;
    offset += 2 + length;
  }

  if (exifOffset === -1 || exifOffset + 8 >= bytes.length) return result;

  // Tiff basligi
  const byteOrder = String.fromCharCode(bytes[exifOffset], bytes[exifOffset + 1]);
  const littleEndian = byteOrder === 'II';
  if (byteOrder !== 'II' && byteOrder !== 'MM') return result;

  const reader = makeReader(buffer, littleEndian);
  const tiffHeader = exifOffset;

  // 42 (0x2A) dogrulamasi ve IFD0 ofseti
  if (reader.u16(tiffHeader + 2) !== 42) return result;
  const ifd0Offset = tiffHeader + reader.u32(tiffHeader + 4);
  result.valid = true;

  const ifd0 = parseIFD(reader, ifd0Offset);

  let exifIfdOffset = 0;
  let gpsIfdOffset = 0;

  for (const e of ifd0) {
    switch (e.tag) {
      case 0x010e:
        result.imageDescription = readAscii(reader, e);
        break;
      case 0x010f:
        result.make = readAscii(reader, e);
        break;
      case 0x0110:
        result.model = readAscii(reader, e);
        break;
      case 0x0112:
        result.orientation = readShort(reader, e);
        break;
      case 0x0131:
        result.software = readAscii(reader, e);
        break;
      case 0x0132:
        result.dateTime = readAscii(reader, e);
        break;
      case 0x8769:
        exifIfdOffset = tiffHeader + reader.u32(e.valueOffset);
        break;
      case 0x8825:
        gpsIfdOffset = tiffHeader + reader.u32(e.valueOffset);
        break;
    }
  }

  // Exif alt-IFD: pozlama, ISO, odak
  if (exifIfdOffset) {
    const exifIfd = parseIFD(reader, exifIfdOffset);
    for (const e of exifIfd) {
      switch (e.tag) {
        case 0x829a:
          result.exposureTime = reader.rational(e.valueOffset);
          break;
        case 0x829d:
          result.fNumber = reader.rational(e.valueOffset);
          break;
        case 0x8827:
          result.iso = readShort(reader, e);
          break;
        case 0x920a:
          result.focalLength = reader.rational(e.valueOffset);
          break;
      }
    }
  }

  // GPS alt-IFD: enlem / boylam
  if (gpsIfdOffset) {
    const gpsIfd = parseIFD(reader, gpsIfdOffset);
    let latRef: string | undefined;
    let lngRef: string | undefined;
    let latEntry: IfdEntry | undefined;
    let lngEntry: IfdEntry | undefined;

    for (const e of gpsIfd) {
      switch (e.tag) {
        case 0x0001:
          latRef = readAscii(reader, e);
          break;
        case 0x0002:
          latEntry = e;
          break;
        case 0x0003:
          lngRef = readAscii(reader, e);
          break;
        case 0x0004:
          lngEntry = e;
          break;
      }
    }
    if (latEntry) result.latitude = readCoord(reader, latEntry, latRef);
    if (lngEntry) result.longitude = readCoord(reader, lngEntry, lngRef);
  }

  return result;
}

/** DMS koordinatini ondalik dereceye cevirir. */
export function coordToDecimal(coord: {
  degrees: number;
  minutes: number;
  seconds: number;
}): number {
  const sign = coord.degrees < 0 ? -1 : 1;
  const abs = Math.abs(coord.degrees) + coord.minutes / 60 + coord.seconds / 3600;
  return sign * abs;
}

/** GPS'i regex dogrulamali "48.8584, 2.2945" metnine cevirir. */
export function gpsToDMS(coord: {
  ref: string;
  degrees: number;
  minutes: number;
  seconds: number;
}): string {
  const d = Math.floor(coord.degrees);
  const m = Math.floor(coord.minutes);
  const s = Math.round(coord.seconds * 100) / 100;
  return `${d}° ${m}' ${s}" ${coord.ref}`;
}

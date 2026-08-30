import QRCode from 'qrcode';

export async function textToQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 512,
    margin: 2,
    errorCorrectionLevel: 'M',
  });
}

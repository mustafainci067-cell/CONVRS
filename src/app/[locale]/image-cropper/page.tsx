import type { Metadata } from 'next';
import ImageCropper from '@/components/converters/ImageCropper';

export const metadata: Metadata = {
  title: 'Image Cropper — Convrs',
  description:
    'Crop images by dragging a selection or choosing preset ratios like 1:1, 16:9, 3:2 and more — entirely in your browser.',
};

export default function ImageCropperPage() {
  return <ImageCropper />;
}

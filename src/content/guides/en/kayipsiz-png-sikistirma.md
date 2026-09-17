---
title: "How to Reduce PNG Size Without Losing Quality"
description: "Technical details of lossless image compression algorithms, color quantization methods, and browser-based PNG optimization."
date: "2026-09-17"
tags: ["PNG", "Compression", "Optimization", "Image Processing"]
---

The PNG (Portable Network Graphics) format is a wonderful technology developed to replace the patented GIF format, providing lossless compression and offering full transparency with an alpha channel. However, it comes with a price: File sizes can be drastically large. While PNG is mandatory for visuals with sharp edges like illustrations, icon sets, or text screenshots, not optimizing the sizes has devastating effects on web performance. So, how can we shrink a PNG file without losing the color information in the pixels?

The answer lies in color quantization, aggressive execution of the DEFLATE algorithm, and unnecessary metadata cleanup.

### Color Quantization

PNG files are usually saved as TrueColor (24-bit color) or TrueColor + Alpha (32-bit color). This means it consumes 3 to 4 bytes of memory for the RGB(A) information of each pixel in the image. If an image contains only 10 different colors (for example, a logo), using a 24-bit palette capable of defining 16.7 million colors for each pixel is a waste of resources.

This is where the **indexed-color (8-bit) PNG** format comes into play. In the quantization process, the colors in the image are analyzed and a 'color palette' containing a maximum of 256 colors is created. Now, instead of holding 3-4 byte RGB values, pixels only hold a 1-byte palette index number. Tone transitions are simulated using a dithering algorithm (such as Floyd-Steinberg dithering) that is very difficult for the human eye to perceive. Even though this process seems 'lossy', it provides almost a lossless result in terms of visual quality and reduces the file size by between 60% and 80%.

### DEFLATE Algorithm and Filtering

At the heart of PNG lies the DEFLATE algorithm, a combination of LZ77 and Huffman coding, which is also used in the ZIP format. However, before sending raw pixels to the DEFLATE algorithm, PNG performs a preprocessing step: Delta filtering.

In the filtering step, instead of each pixel value, the 'difference' (delta) between the pixel and the pixels preceding it (to its left, top, etc.) is calculated. Since adjacent pixels are usually the same color, this difference is often zero. The DEFLATE algorithm compresses long chains of zeros (000000...) with extraordinarily high efficiency.

Optimization tools test the best delta filter (Sub, Up, Average, Paeth) for each row to provide the optimal data (containing the most zeros or repeating patterns) to the DEFLATE compressor. Standard graphics software skips these iterative trials to be fast, so a PNG passed through a professional optimization tool always comes out smaller.

### Unnecessary Metadata Cleanup

Most graphics editing software (Photoshop, Illustrator, etc.) adds ICC color profiles, EXIF data, Adobe-specific chunks, comments, and creation dates inside the PNG when exporting the file. None of these are needed in the web environment. Leaving only the image data (IDAT chunk) and header (IHDR chunk) and stripping out the remaining tEXt, iTXt, or gAMA chunks directly reduces the file size by around 10% for small-sized icons or logos.

### Browser-Based (Zero-Backend) Optimization

Command-line tools (pngquant, optipng, advpng) or cloud APIs running on the server side are usually needed to perform all these operations. You have to upload your raw screenshots or product photos, hundreds of megabytes in size, to tools running on the server side, wait for the process to finish, and download them again. It consumes your network bandwidth, and your files are stored on third-party servers.

At Convrs, we perform PNG compression operations directly in the browser with our **Zero-Backend** architecture. We run powerful compression engines written in Rust or C/C++ (like pngquant) via WebAssembly (Wasm). The file you drag and drop:
1. Stays on your computer, nothing is sent to the internet (Zero network latency, 100% privacy).
2. Directly utilizes your computer's multi-core CPU to maximize optimization parameters (maximum compression level).
3. The optimization finishes instantly, and the result is downloaded to your device in a second.

Reducing the size of your PNG files without sacrificing quality is mandatory for web performance. By using the right optimization methods with a zero-backend infrastructure, you can save time and keep full control of your data.

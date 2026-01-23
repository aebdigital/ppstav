#!/bin/bash

# Image Compression Script for P+P STAV
# Compresses all JPEG images to max 2000px, quality 85
# This maintains visual quality while significantly reducing file size

# Target the entire sources directory to catch hero, services, and portfolio images
TARGET_DIR="public/sources"
QUALITY=85
MAX_SIZE=2000
# Threshold in bytes (300KB)
SIZE_THRESHOLD=307200

echo "=========================================="
echo "P+P STAV Image Compression Script"
echo "=========================================="
echo ""

# Count images before
TOTAL_BEFORE=$(find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | wc -l | tr -d ' ')
SIZE_BEFORE=$(du -sh "$TARGET_DIR" 2>/dev/null | cut -f1)

echo "Found $TOTAL_BEFORE JPEG images in $TARGET_DIR"
echo "Current folder size: $SIZE_BEFORE"
echo ""
echo "Settings:"
echo "  - Max dimension: ${MAX_SIZE}px"
echo "  - Quality: ${QUALITY}%"
echo "  - Size threshold: $((SIZE_THRESHOLD / 1024))KB"
echo ""
echo "Starting compression..."
echo ""

# Process all JPEG files
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    # Get current file size
    FILESIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)

    # Only process files larger than threshold
    if [ "$FILESIZE" -gt "$SIZE_THRESHOLD" ]; then
        # Compress with ImageMagick
        convert "$file" \
            -resize "${MAX_SIZE}x${MAX_SIZE}>" \
            -quality "$QUALITY" \
            -strip \
            "$file"

        NEWSIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        SAVED=$((FILESIZE - NEWSIZE))

        if [ "$SAVED" -gt 0 ]; then
            echo "✓ $(basename "$file") - saved $(($SAVED / 1024))KB"
        else
             echo "- $(basename "$file") - no reduction (already optimized)"
        fi
    fi
done

echo ""
echo "=========================================="
echo "Compression complete!"
echo "=========================================="

SIZE_AFTER=$(du -sh "$TARGET_DIR" 2>/dev/null | cut -f1)
echo ""
echo "Before: $SIZE_BEFORE"
echo "After:  $SIZE_AFTER"
echo ""
echo "Done! Your images are now optimized."

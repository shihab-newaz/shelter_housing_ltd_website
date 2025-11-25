import React, { useEffect, useRef, useState, CSSProperties } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

/**
 * Responsive YouTube video embed component
 * Features:
 * - Responsive design that adapts to container size
 * - Maintains 16:9 aspect ratio
 * - Eliminates letterboxing by scaling video to cover container
 * - Updates dimensions on window resize
 * - Uses YouTube's privacy-enhanced mode
 *
 * @component
 * @param {YouTubeEmbedProps} props - Component props
 * @returns {React.ReactElement} A responsive YouTube video embed
 *
 */
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
  // Reference to the container div for dimension calculations
  const containerRef = useRef<HTMLDivElement>(null);

  // State to track container dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  /**
   * Updates the container dimensions in state based on the current container size
   * Called on mount and window resize
   */
  const updateDimensions = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  // Effect to handle dimension updates and cleanup
  useEffect(() => {
    // Initial dimensions update
    updateDimensions();

    // Add resize event listener
    window.addEventListener('resize', updateDimensions);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  /**
   * Calculate iframe dimensions to ensure high resolution playback
   * YouTube adapts quality based on player size, so we ensure minimum 1080p dimensions
   * @returns {CSSProperties} CSS properties for the iframe
   */
  const getIframeStyles = (): CSSProperties => {
    // Return empty object if dimensions aren't set yet
    if (dimensions.width === 0) return {};

    const containerWidth = dimensions.width;
    const containerHeight = dimensions.height;
    const aspectRatio = 16 / 9; // Standard YouTube video aspect ratio

    // Ensure minimum dimensions for 1080p/4K quality
    // YouTube uses player size to determine quality - larger = higher quality
    const minWidth = 1920; // 1080p width minimum
    const minHeight = 1080; // 1080p height minimum

    // Initially set dimensions based on width
    let iframeWidth = Math.max(containerWidth, minWidth);
    let iframeHeight = iframeWidth / aspectRatio;

    // If height is too small, scale based on height instead
    if (iframeHeight < containerHeight || iframeHeight < minHeight) {
      iframeHeight = Math.max(containerHeight, minHeight);
      iframeWidth = iframeHeight * aspectRatio;
    }

    // Return styles for centered, scaled iframe
    return {
      width: iframeWidth,
      height: iframeHeight,
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
  };

  // Build YouTube embed URL with HD quality parameters
  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    modestbranding: '1',
    loop: '1',
    playlist: videoId,
    playsinline: '1',
    rel: '0',
    showinfo: '0',
    iv_load_policy: '3',
    start: '11',
    enablejsapi: '1', // Enable JS API for quality control
    origin: typeof window !== 'undefined' ? window.location.origin : '',
    vq: 'hd1080', // Request 1080p quality (hd720, hd1080, highres for 4K)
    hd: '1', // Legacy HD parameter
  });
  embedUrl.search = params.toString();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-black"
    >
      <iframe
        src={embedUrl.toString()}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={getIframeStyles()}
        // Explicitly set large dimensions for quality hint
        width="1920"
        height="1080"
      />
    </div>
  );
};

export default YouTubeEmbed;

/**
 * YouTube URL Parameters Explanation:
 * - autoplay=1: Automatically start playing
 * - mute=1: Start muted (required for autoplay)
 * - controls=0: Hide player controls
 * - modestbranding=1: Hide YouTube logo
 * - loop=1: Loop the video
 * - playlist=${videoId}: Required for looping
 * - playsinline=1: Play inline on mobile devices
 * - rel=0: Don't show related videos
 * - showinfo=0: Hide video title and uploader
 * - iv_load_policy=3: Hide video annotations
 * - start=11: Start video at 11 seconds
 * - enablejsapi=1: Enable JavaScript API for quality control
 * - origin: Required for JS API security
 * - vq=hd1080: Request 1080p quality (options: small, medium, large, hd720, hd1080, highres)
 * - hd=1: Legacy parameter to hint HD preference
 * 
 * Note: YouTube quality is ultimately determined by:
 * 1. Player dimensions (larger iframe = higher quality available)
 * 2. Network conditions
 * 3. Video availability (source must have 1080p/4K)
 * The vq parameter is a hint, not a guarantee.
 */
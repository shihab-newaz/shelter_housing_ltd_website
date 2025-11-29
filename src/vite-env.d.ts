/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_CLOUDINARY_VIDEO_MOBILE: string;
  readonly VITE_CLOUDINARY_VIDEO_DESKTOP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

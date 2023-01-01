/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_TITLE: string
    readonly VITE_FACEBOOK_ID:string
    readonly VITE_GOOGLE_CLIENT_ID:string
    readonly VITE_GOOGLE_CLIENT_SECRET :string
    readonly VITE_API_SERVER :string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
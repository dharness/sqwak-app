import { User } from "@supabase/supabase-js";

declare module "express-serve-static-core" {
  export interface Request {
    user?: User;
    track?: Track;
    frame?: Frame;
  }
}

export interface RawFrame {
  imgData: string;
  duration: number;
}

export interface Frame {
  imgUrl: string;
  duration: number;
}

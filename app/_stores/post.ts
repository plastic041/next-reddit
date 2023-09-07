import type { Post } from "~/_typings/post";
import { atom } from "jotai";

export const currentPostAtom = atom<Post | null>(null);

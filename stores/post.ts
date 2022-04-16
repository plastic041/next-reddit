import type { Post } from "~/typings/post";
import { atom } from "jotai";

export const currentPostAtom = atom<Post | null>(null);

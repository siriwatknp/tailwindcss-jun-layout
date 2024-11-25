import {
  Blocks,
  BookOpenText,
  Code,
  PanelsTopLeft,
  PencilLineIcon,
} from "lucide-react";

export default {
  "book-open-text": BookOpenText,
  code: Code,
  blocks: Blocks,
  "panels-top-left": PanelsTopLeft,
  "pencil-line": PencilLineIcon,
} as Record<string, typeof Blocks | undefined>;

import StartButton from "@/components/StartButton";
import { BOARD_COLS, BOARD_ROWS, CELL_SIZE } from "@/constants/config";
import Score from "@/components/Score";
export default function EndScreen() {
  return (
    <div
      className="relative border-1 select-none"
      style={{
        width: `${BOARD_COLS * CELL_SIZE}px`,
        height: `${BOARD_ROWS * CELL_SIZE}px`,
      }}
    >
      <Score />
      <StartButton />
    </div>
  );
}

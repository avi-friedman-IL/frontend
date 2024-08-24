import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { boardService } from "../services/board/board.service.local";
import { updateBoard } from "../store/actions/board.actions";

import { TaskList } from "./TaskList";

export function GroupPreview({ group }) {
  // console.log(group)
  const board = useSelector((storeState) => storeState.boardModule.board);

  const navigate = useNavigate();

  async function deleteGroup(ev) {
    ev.preventDefault();

    try {
      const newBoard = await boardService.updateBoard(board, group.id, null, {
        key: "deleteGroup",
        value: null,
      });
      await updateBoard(newBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }

    navigate(`/board/${board._id}`);
  }

  return (
    <div className="group-preview">
      <h3>{group?.title}</h3>
      <button onClick={deleteGroup}>Delete list</button>
      <TaskList group={group} />
    </div>
  );
}

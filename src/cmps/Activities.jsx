import { IoIosArrowBack } from "react-icons/io";
import SvgIcon from "./SvgIcon";
import { useEffect } from "react";

export function Activities({ board, setIsActivitiesOpen, setIsMenuOpen }) {
  function formatDateForTask(dateString) {
    const date = new Date(dateString.split("/").reverse().join("-"));
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();

    if (year === currentYear) {
      return formattedDate;
    } else {
      return `${formattedDate}, ${year}`;
    }
  }

  function formatDateTimeForTask(date, time) {
    const formattedDate = formatDateForTask(date);
    const formattedTime = time
      ? new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
  }

  return (
    <section className="activities-container">
      <header className="activity-header">
        <span className="close-btn" onClick={() => setIsMenuOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <span className="back-btn" onClick={() => setIsActivitiesOpen(false)}>
          <IoIosArrowBack />
        </span>

        <h3>Activity</h3>
      </header>
      <ul className="activities-list">
        {board.activities.map((activity) => (
          <li key={activity.id} className="activity">
            <div
              className="member-img"
              style={{
                backgroundColor: activity.byMember.color
                  ? activity.byMember.color
                  : "none",
                // backgroundImage: activity.byMember.imgUrl
                //   ? `url(${activity.byMember.imgUrl})`
                //   : "none",
              }}
            >
              {activity.byMember.fullname[0]}
            </div>
            <section className="activity-data" style={{ gridColumn: "2" }}>
              <span className="activity-fullname">
                {activity.byMember.fullname}{" "}
              </span>

              {activity.type === "createBoard" && (
                <span>{activity.title} </span>
              )}

              {activity.type === "addBoard" && (
                <span>
                  {activity.title}{" "}
                  <a className="link" href={`/board`}>
                    Frello Workspace
                  </a>
                </span>
              )}

              {activity.type === "addTask" && (
                <span>
                  added{" "}
                  <a
                    className="link"
                    href={`/board/${board._id}/${activity.group.id}/${activity.task.id}`}
                  >
                    {activity.task.title}{" "}
                  </a>
                  to {activity.group.title}
                </span>
              )}

              {activity.type === "addGroup" && (
                <span>added {activity.group.title} to this board</span>
              )}

              {activity.type === "addChecklist" && (
                <span>
                  added {activity.checklist.title} to
                  <a
                    className="link"
                    href={`/board/${board._id}/${activity.group.id}/${activity.task.id}`}
                  >
                    {" "}
                    {activity.task.title}
                  </a>
                </span>
              )}

              {activity.type === "completeChecklistItem" && (
                <span>
                  complete {activity.item.text} on
                  <a
                    className="link"
                    href={`/board/${board._id}/${activity.group.id}/${activity.task.id}`}
                  >
                    {" "}
                    {activity.task.title}
                  </a>
                </span>
              )}

              {activity.type === "setDueDate" && (
                <span>
                  set{" "}
                  <a
                    className="link"
                    href={`/board/${board._id}/${activity.group.id}/${activity.task.id}`}
                  >
                    {activity.task.title}
                  </a>{" "}
                  to be due{" "}
                  {formatDateTimeForTask(
                    activity.dueDate.date,
                    activity.dueDate.time
                  )}
                </span>
              )}

              {activity.type === "deleteChecklist" && (
                <span>
                  removed {activity.checklist.title} from
                  <a
                    className="link"
                    href={`/board/${board._id}/${activity.group.id}/${activity.task.id}`}
                  >
                    {" "}
                    {activity.task.title}
                  </a>
                </span>
              )}

              {activity.type === "deleteTask" && (
                <span>
                  deleted card #{activity.taskNumber} from{" "}
                  {activity.group.title}
                </span>
              )}

              {activity.type === "deleteGroup" && (
                <span>deleted list {activity.group.title}</span>
              )}
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}

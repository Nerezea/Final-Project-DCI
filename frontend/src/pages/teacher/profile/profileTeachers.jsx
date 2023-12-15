import * as mockup from "../../mockupData.js";
import { Roles } from "../../../store/slice/auth.slice.js";
import { useSelector } from "react-redux";

const profileTeachers = () => {
  // Which Userrole?
  const role = useSelector((store) => store.auth.role);

  const menus = useMemo(() => {
    switch (role) {
      case Roles.TEACHER:
        return mockup.teacherButtonsCalendar;
      case Roles.PARENT:
        return mockup.parentButtonsCalendar;
    }
  }, [role]);

  return (
    <div className="container-profile">
      <aside className="button-menu">
        <ul>
          {menus.map((item, index) => (
            <li key={index}>
              <a
                className="parent-buttons"
                onClick={() => handleMenuItemClick(item.action)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="main-profile-container">profile for teacher, 😄 </div>
    </div>
  );
};

export default profileTeachers;

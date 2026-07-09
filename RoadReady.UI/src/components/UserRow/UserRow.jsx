import "./UserRow.css";

function UserRow({
    user,
    onEdit,
    onDelete
}) {
    return (
        <tr>

            <td>
                {user.userId}
            </td>

            <td>
                {user.firstName}
            </td>

            <td>
                {user.lastName}
            </td>

            <td>
                {user.email}
            </td>

            <td>
                <span
                    className={`role ${user.role.toLowerCase()}`}
                >
                    {user.role}
                </span>
            </td>

            <td>

                <div className="action-buttons">

                    <button
                        className="edit-btn"
                        onClick={() => onEdit(user)}
                    >
                        ✏️ Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(user)}
                    >
                        🗑 Delete
                    </button>

                </div>

            </td>

        </tr>
    );
}

export default UserRow;
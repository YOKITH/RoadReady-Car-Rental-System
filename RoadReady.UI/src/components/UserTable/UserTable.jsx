import UserRow from "../UserRow/UserRow";
import "./UserTable.css";

function UserTable({ users, onEdit, onDelete }) {
    if (users.length === 0) {
        return (
            <div className="empty-users">
                No users found.
            </div>
        );
    }

    return (
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <UserRow
                            key={user.userId}
                            user={user}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
import { Navigate } from "react-router-dom";

export const Dashboard = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allowedEmail = 'alirazakhan2540@gmial.com';

    if (user && user.email === allowedEmail) {
        return children;
    } else {
        return <Navigate to={'/'} />;
    }
};

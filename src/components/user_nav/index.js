import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { logoutUser } from '../../store/modules/user/actions';

import './style.css';

const UserNav = () => {
    const dispatch = useDispatch();
    const logout = () => {
        //console.log("Clicked 'logout' button!");
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutUser());
            }
        }).catch((err) => {
              console.log("An error occured. Error: " + err);
        });
    }
    
    return (
        <div className="col-12 btn-container">
            <Link className="link" to="/user/">
                <button className="btn btn-secondary">Orders</button>
            </Link>
            <Link className="link" to="/user/history">
                <button className="btn btn-secondary">Old Orders</button>
            </Link>            
            <button className="link btn btn-secondary" to="/logout"
                    onClick={() => logout()}
            >
                    Logout
            </button>
        </div>
    );
};

export default UserNav;
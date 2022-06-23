import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext/UserContext";

//Components imports
import SideBar from "../components/SideBar";

//Helpers imports
import { convertRoutes } from "../helpers/Routes";
import { Roles } from '../helpers/Roles';

export default function Landing() {
    const navigate = useNavigate();
    const { token, getUserStorage} = useContext(UserContext);
    const { rol } = getUserStorage();
    const isLogged = token !== '';

    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    };

    const pathname = usePathname();
    const routes = convertRoutes(navigate);


    useEffect(() => {
        const castRol = Roles.find((r) => {
            return r.code === rol;
        });
        if (isLogged === false) navigate("/")
        else {
            const fixedRoutes = routes.map(({ path, ...rest }) => {
                if (rest.items !== undefined) {
                    rest.items.map(({ pathi, ...data }) => {
                        return ({
                            ...data,
                            pathi: `${pathi}`
                        })
                    })
                }
                return ({
                    ...rest,
                    path: `${path}`
                })
            });
            fixedRoutes.forEach(({ path, roles, items }) => {
                if (items !== undefined) {
                    items.forEach(({ pathi, rolesi }) => {
                        let match = pathi === pathname ? true : false;
                        if (match === true) {
                            const authorized = rolesi.some((rol) => rol === castRol.name);
                            if (authorized === false)
                                navigate("/landing");
                        }
                    })
                } else {
                    let match = path === pathname ? true : false;
                    if (match === true) {
                        const authorized = roles.some((rol) => rol === castRol.name);
                        if (authorized === false)
                            navigate("/landing");
                    }
                }
            })
        }
    }, [isLogged, navigate, pathname, rol, routes]);

    return (
        <div className="w-full h-screen">
            <SideBar />
            <Outlet />
        </div>
    );
}
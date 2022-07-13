import React from 'react';
import UsersTopMenu from "./UsersTopMenu";

const UserScreenTemplate = (props) => {
    return (
        <div className="mt-20 flex flex-col my-20">
            <div className="flex-1 py-3">
                <UsersTopMenu/>
            </div>
            <div className="flex flex-col gap-4 mx-4">
                {props.children}
            </div>
        </div>
    );
};

export default UserScreenTemplate;

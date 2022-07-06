import React from 'react';
import UsersSideMenu from './UsersSideMenu';

function UserPageTemplate(props) {
    return (
        <div className="xl:w-3/5 mx-auto flex divide-x items-start gap-x-8 min-h-[80vh]">
            <div className="flex-1 py-3">
                <UsersSideMenu mobile={false} />
            </div>
            <div className="pl-8 flex-[3] flex flex-col items-start gap-4">
                {props.children}
            </div>
        </div>
    );
}

export default UserPageTemplate;
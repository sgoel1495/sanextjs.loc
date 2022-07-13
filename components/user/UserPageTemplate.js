import React from 'react';
import UsersMenu from './UsersMenu';

function UserPageTemplate(props) {
    const mobileView = <div className="mt-20 flex flex-col my-20">
        <div className="flex-1 py-3">
            <UsersMenu mobile={props.mobile}/>
        </div>
        <div className="flex flex-col gap-4 mx-4">
            {props.children}
        </div>
    </div>
    const browserView = <div className="xl:w-3/5 mx-auto flex divide-x items-start gap-x-8 min-h-[80vh]">
        <div className="flex-1 py-3">
            <UsersMenu/>
        </div>
        <div className="pl-8 flex-[3] flex flex-col items-start gap-4">
            {props.children}
        </div>
    </div>
    return (
        props.mobile ? mobileView : browserView
    );
}

export default UserPageTemplate;

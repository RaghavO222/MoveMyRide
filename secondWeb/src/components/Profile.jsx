import React from 'react';
import { Descriptions } from 'antd';

const Profile = () => {
    const user = localStorage.getItem("user-info")
    const role = localStorage.getItem("role")
    const items = [
        {
          key: '1',
          label: 'UserName',
          children: `${user}`,
        },
        {
          key: '2',
          label: 'Role',
          children: `${role}`,
        }
      ];


    return (
        <>
        <Descriptions title="Profile" items={items} />
        </>
    )
}

export default Profile;
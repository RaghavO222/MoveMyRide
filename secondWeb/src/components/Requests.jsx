import React, { useEffect, useState } from 'react'
import { Flex, Input, Button, Table, ConfigProvider, Layout, message , Space} from 'antd';
import { baseURL } from '../../utils/config';
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from "react-router";
import MRequest from './MRequest';

const Requests = () => {
  const { Header, Content } = Layout;
  const [data, setData] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${baseURL}/api/tbreq/gallreq`)

        if (response?.status === 200) {
          setData(response.data.data)
        } else {
          console.log("galt ho giya");
        }

      } catch (err) {
        console.log("start mei hi: ", err)
      }
    }

    fetchData();
  }, [refreshTrigger]);

  const goBack = () => {
    setSelectedRequestId(null);
    setRefreshTrigger(prev => !prev);
  };


  const columns = [
    { key: '1', title: "ID", render: (text, record, index) => index + 1 },
    { key: '2', title: "Plate Number", dataIndex: "plate" },
    { key: '3', title: "Date", dataIndex: "date" },
    { key: '4', title: "Time", dataIndex: "time" },
    { key: '5', title: "Requested By", dataIndex: "madeBy" },
    { key: '6', title: "Status", dataIndex: "status" }
  ];
  return (
    <>
      {selectedRequestId === null ? (
        <>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          size="small"
          className="text-xs"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRequestId(record._id);
            },
          })}
          rowKey="_id"
        />
        </>
      ) : (
        <MRequest id={selectedRequestId} goBack={goBack} />
      )}
    </>
  )
}

export default Requests;
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { baseURL } from '../../utils/config';
import { Image, Spin, Descriptions, Flex, Button, Card, Space } from 'antd';

const MRequest = ({ id, goBack }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(`${baseURL}/api/tbreq/sreq`, { id });
                if (response?.status === 200) {
                    setData(response.data.data);
                } else {
                    console.log('Fetch error');
                }
            } catch (error) {
                console.log('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <Spin />;

    const cardHeader = (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

            <span>Request Details</span>
            <Button onClick={goBack} color="danger" variant="text" >
                X
            </Button>

        </div>
    );

    const accReq = async () => {
        try {
          const ge = await axiosInstance.post(`${baseURL}/api/tbreq/getmail`, { plate: data.plate });
      
          if (ge?.status === 200) {
            try {
              const res = await axiosInstance.post(`${baseURL}/api/mail/sendnoti`, {
                email: ge.data.mail.email,
                plate: data.plate
              });
      
              if (res.data.success) {
                console.log("Email sent successfully!");
      
                try {
                  const response = await axiosInstance.patch(`${baseURL}/api/addcar/upcar`, {
                    id,
                    status: "Accepted"
                  });
      
                  if (response?.status === 200) {
                    console.log("Status updated to Accepted!");
                  } else {
                    console.log("Status update failed!");
                  }
                } catch (error) {
                  console.log('Status update error:', error);
                } finally {
                  goBack();
                }
      
              } else {
                console.log("Email sending failed!");
              }
            } catch (error) {
              console.log('Email error:', error);
            }
      
          } else {
            console.log("Cannot fetch email");
          }
        } catch (err) {
          console.log(err);
        }
      };
      

    const rejReq = async () => {
        try {
            const response = await axiosInstance.patch(`${baseURL}/api/addcar/upcar`, { id, status: "Rejected" });
            if (response?.status === 200) {
                goBack();
            } else {
                console.log("reject nhi hua")
            }

        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <>
            <Card title={cardHeader} bordered={false} style={{ width: '100%' }}>
                <Flex gap="small" align="start" style={{ marginBottom: 24 }}>


                    <Descriptions column={1} layout="vertical" style={{ flex: 1 }}>
                        <Descriptions.Item label="Plate Number">{data.plate || 'NA'}</Descriptions.Item>
                        <Descriptions.Item label="Made By">{data.madeBy || 'NA'}</Descriptions.Item>
                        <Descriptions.Item label="Date">{data.date || 'NA'}</Descriptions.Item>
                    </Descriptions>

                    <Image
                        width={500}
                        height={500}
                        src={data.image}
                        style={{ objectFit: 'cover' }}
                    />
                </Flex>

                {data.status == "Pending" ? (
                    <Flex justify="center" gap="large">
                        <Button type="primary" onClick={accReq}>Accept</Button>
                        <Button type="primary" danger onClick={rejReq}>Reject</Button>
                    </Flex>
                ) : (
                    <Flex justify="center" gap="large">
                        <Button type="primary">done</Button>
                    </Flex>
                )}


            </Card>

        </>
    );
};

export default MRequest;


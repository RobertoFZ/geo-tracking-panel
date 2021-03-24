import React from 'react';
import { Avatar, Button, List, Popconfirm, Select, Skeleton } from 'antd';
import { User } from 'api/User/declarations';
import { LocationZone } from 'api/LocationZone/declarations';
import { PaginationData } from 'api/BaseService/declarations';

interface IUsersList {
  users?: User[];
  location_zones?: LocationZone[];
  loading?: boolean;
  onZoneChange: (user: User, zone_id: number) => void;
  paginationData: PaginationData<User>;
  onPageChange: (page: number) => void;
  onPasswordReset: (email: string) => void;
}

const UsersList = ({
  users = [],
  location_zones = [],
  loading = false,
  onZoneChange,
  paginationData,
  onPageChange,
  onPasswordReset
}: IUsersList) => (
  <List
    loading={loading}
    itemLayout="horizontal"
    dataSource={users}
    pagination={{
      total: paginationData.count,
      pageSize: paginationData.limit,
      current: paginationData.page,
      onChange: onPageChange
    }}
    renderItem={(item: User) => (
      <List.Item
        actions={[
          <Popconfirm
            title={'¿Seguro que desea enviar una nueva contraseña al usuario?'}
            okText='Sí'
            cancelText='Cancelar'
            onConfirm={() => onPasswordReset(item.email)}>
            <Button type='primary'>Reestablecer contraseña</Button>
          </Popconfirm>,
          <Select
            onChange={(value: number) => onZoneChange(item, value)}
            value={item.assignation?.location_zone_id}
            style={{ width: 250 }}>
            {
              location_zones.map((locationZone: LocationZone) =>
                <Select.Option key={locationZone.id} value={locationZone.id!}>{locationZone.name}</Select.Option>
              )
            }
          </Select>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar>{`${item.first_name[0]}${item.last_name[0]}`}</Avatar>
          }
          title={`${item.first_name} ${item.last_name}`}
        />
      </List.Item>
    )}
  />
)

export default UsersList;
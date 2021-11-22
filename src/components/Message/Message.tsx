import React from 'react';
import clsx from 'clsx';
import { SystemMessage } from './SystemMessage';
import { IMessageStatus } from '../MessageStatus';
import { Avatar } from '../Avatar';
import { Time } from '../Time';
import { Typing } from '../Typing';

export interface User {
  avatar?: string;
  name?: string;
  [k: string]: any;
}

export type MessageId = string | number;

export interface MessageProps {
  /**
   * 唯一ID
   */
  _id: MessageId;
  /**
   * 消息类型
   */
  type: string;
  /**
   * 消息内容
   */
  content?: any;
  /**
   * 消息创建时间
   */
  createdAt?: number;
  /**
   * 消息发送者信息
   */
  user?: User;
  /**
   * 消息位置
   */
  position?: 'left' | 'right' | 'center';
  /**
   * 是否显示时间
   */
  hasTime?: boolean;
  /**
   * 状态
   */
  status?: IMessageStatus;
  /**
   * 消息内容渲染函数
   */
  renderMessageContent?: (message: MessageProps) => React.ReactNode;
  /**
   * 方便扩展其他属性
   */
  [prop: string]: any;
}

const Message = (props: MessageProps) => {
  const { renderMessageContent = () => null, ...msg } = props;
  const { type, content, user, _id: id } = msg;

  if (type === 'system') {
    return <SystemMessage content={content.text} action={content.action} />;
  }

  return (
    <div className={clsx('Message', msg.position)} data-id={id} data-type={type}>
      {msg.hasTime && msg.createdAt && (
        <div className="Message-meta">
          <Time date={msg.createdAt} />
        </div>
      )}
      <div className="Message-content" role="alert" aria-live="assertive" aria-atomic="false">
        {user && user.avatar && <Avatar src={user.avatar} shape="square" alt={user.name} />}
        {type === 'typing' ? <Typing /> : renderMessageContent(msg)}
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
  position: 'left',
  hasTime: true,
};

export default React.memo(Message);

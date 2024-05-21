'use client'

import React from 'react';
import { Link } from 'react-router-dom';
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import './App.css';

const apiKey = 'sesb46h7zb6p';
const appId = '66001';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE';

function PrivateChatPage({ userId }) {
  return (
    <div>
      <h2>Private Chat with {userId}</h2>
      {/* Implementa tu lógica de chat privado aquí */}
    </div>
  );
}

function App() {
  const handleClickUser = (userId) => {
    // Navega a la página de chat en privado cuando se haga clic en el usuario
    // Aquí podrías utilizar tu biblioteca de enrutamiento preferida, como React Router
    // Por ejemplo, utilizando Link de React Router
    return <Link to={`/private-chat/${userId}`} />;
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <StreamApp apiKey={apiKey} appId={appId} token={token}>
        <div className="wrapper box">
          <h3>React Activity Feed</h3>
          <NotificationDropdown right />
        </div>
        <StatusUpdateForm
          emojiI18n={{
            search: 'Type here to search...',
            categories: { recent: 'Recent Emojis' },
          }}
        />
        <FlatFeed
          notify
          feedGroup="user"
          options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
          Paginator={InfiniteScrollPaginator}
          Activity={({ activity, feedGroup, userId }) => (
            <Activity
              activity={activity}
              feedGroup={feedGroup}
              userId={userId}
              onClickUser={() => handleClickUser(userId)} // Maneja el clic en el usuario
              Footer={() => (
                <>
                  <ActivityFooter activity={activity} feedGroup={feedGroup} userId={userId} />
                  <CommentField activity={activity} />
                  <CommentList
                    activityId={activity.id}
                    CommentItem={({ comment }) => (
                      <div className="wrapper">
                        <CommentItem comment={comment} />
                        <LikeButton reaction={comment} />
                      </div>
                    )}
                  />
                </>
              )}
            >
              {/* Agregar la clase profile-image a la imagen del perfil */}
              <img className="profile-image" src={activity.actor.data.profileImage} alt="Profile" />
            </Activity>
          )}
        />
      </StreamApp>
    </div>
  );
}
export default App;
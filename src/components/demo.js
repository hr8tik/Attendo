import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


 const firebaseConfig = {
  apiKey: "AIzaSyAKoWGKBqeylmxmBx3Vsz8LMpTMmgEmWjU",
  authDomain: "test-8b007.firebaseapp.com",
  projectId: "test-8b007",
  storageBucket: "test-8b007.appspot.com",
  messagingSenderId: "845347901373",
  appId: "1:845347901373:web:cc2db1ec0dc76ff6ef0cd4"
};


firebase.initializeApp(firebaseConfig);

const  demo = () => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch the user's groups from Firestore
        firebase
          .firestore()
          .collection("groups")
          .where("members", "array-contains", user.uid)
          .onSnapshot((snapshot) => {
            const userGroups = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setGroups(userGroups);
          });
      } else {
        setUser(null);
        setGroups([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  const createGroup = async () => {
    if (groupName) {
      try {
        await firebase
          .firestore()
          .collection("groups")
          .add({
            name: groupName,
            members: [user.uid], // Include the creator in the members list
          });
        setGroupName("");
      } catch (error) {
        console.error(error.message);
      }
    }

    const joinGroup = async (groupId) => {
      try {
        const groupRef = firebase.firestore().collection("groups").doc(groupId);
        await groupRef.update({
          members: firebase.firestore.FieldValue.arrayUnion(user.uid),
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  };
  return (
    <div>
      <h1>Welcome to the Group App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleSignOut}>Sign Out</button>

          <h2>Your Groups:</h2>
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                {group.name}{" "}
                <button onClick={() => joinGroup(group.id)}>Join</button>
              </li>
            ))}
          </ul>

          <h2>Create a New Group:</h2>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={createGroup}>Create Group</button>
        </div>
      ) : (
        <div>
          <p>Please sign in to use the app.</p>
          <button onClick={handleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
}

export default demo;

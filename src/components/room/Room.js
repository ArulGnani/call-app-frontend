import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from 'react-router-dom'

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <div>
            { props.streamId !== "3" ?
              <video ref={ref} autoPlay controls width="400px" height="300px"/> :
              <audio ref={ref} autoPlay controls/>
            }
        </div>
    );
}

const Room = () => {
    const { roomId, streamId } = useParams()
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = roomId

    useEffect(() => {
        socketRef.current = io.connect("https://call-app-backend.herokuapp.com/");
        getStreamType().then(stream => {
            userVideo.current.srcObject = stream;
            
            socketRef.current.emit("join room", { roomID });
            
            socketRef.current.on("all users", users => {
                console.log('your id ->', socketRef.current.id)
                console.log('all members room ->', users)

                const peers = []; 
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                console.log('connected peers', peers)
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                console.log(`offer form ${payload.callerID}`, payload.signal) 

                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                console.log(`answer to ${payload.id}`, payload.signal)
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
        .catch(err => {
            alert(err)
        })
    }, []);

    const getStreamType = ()=> {
        switch (streamId) {
            case "1":
                return navigator.mediaDevices.getDisplayMedia({ 
                    video : true, audio : true
                })
            case "2":
                return navigator.mediaDevices.getUserMedia({ 
                    video: { noiseSuppression : true },
                    audio: { echoCancellation : true }
                })
            case "3":
                return navigator.mediaDevices.getUserMedia({ 
                    video: false, audio: { echoCancellation : true } 
                })
            case "4":
                return navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: false 
                })
            default: return null
        }
    }


    const createPeer = (userToSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    const addPeer = (incomingSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div>
            { streamId !== "3" ?
              <video ref={userVideo} autoPlay controls width="400px" height="300px"/> :
              <audio ref={userVideo} autoPlay controls/>
            }
             
            {peers.map((peer, index) => {
                console.log('connted - peer ->', peers)
                return (
                    <Video key={index} peer={peer} streamId={streamId}/>
                );
            })}
        </div>
    );
};

export default Room;
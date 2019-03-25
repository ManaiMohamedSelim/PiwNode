
const express = require('express');
const router = express.Router();
const Chat = require('../models/discussion');
const ChatDetail = require('../models/message');
const http = require('http').Server(express);
const io = require('socket.io')(http);

// get list of all chat room list
router.get('/list', (req, res, next) => {
    Chat.find()
        .sort({ date: -1 })
        .then(chats => res.json(chats));
});

// create a new chatroom
router.post('/create', (req, res) => {
    let newChat = new Chat({
            roomTitle: req.body.roomTitle,
           // createdBy: req.body.createdBy
        }
    );

    Chat.addChatRoom(newChat, (err, chat) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Can not create Chat room'
            });
        }
        else {
            res.json ({
                success: true,
                msg: 'Successfully created a chat room'
            });
        }
    });
});

//    Get Chat Details

router.get('/detail/:id', (req, res, next) => {
    const chatId = req.params.id;
    Chat.findById(chatId)
        .then(function (chat) {
            if (chat) {
                const queryForMsgs = ChatDetail.find();
                queryForMsgs.where('chatId', chatId);
                queryForMsgs.populate('author').populate('chatId');
                queryForMsgs.exec(function (err, result) {
                    if (err) {
                        res.json('No chat msgs here'+err);
                    }
                    else {
                        res.json(result);
                    }
                });
            }
        })
        .catch(err => res.status(404).json({ success: false }));
});

//  Add new chat msg with chatRoom Id, username, message

router.post('/addMsg/:id', (req, res, next) => {
    const chatId = req.params.id;
    let newMsg = new ChatDetail({
        chatId: chatId,
        textMessage: req.body.textMessage,
        author: req.body.author,
        type:req.body.type
    });
// add chat message
    ChatDetail.addChatMsg(newMsg, (err, chatMsgs) => {
        if (err) {
            res.json({
                success: false,
                msg: 'No msg send'
            });
        }
        else {
             res.json ({success: true, msg: 'Successfully Send a msg'});
            io.on('connection', function (socket) {
                console.log('A New msg send....');
                socket.on('getMsgBy', function(data) {
                    console.log(data);
                    socket.emit('msgData', {author: data});
                });

                socket.on('msgToAll', function(data) {
                    //Send message to everyone
                    io.sockets.emit('newmsg', data);
                });
            });
        }
    });

});

/**
 * Delete chat msg from chat detail
 * @route   DELETE api/chats/delete/:id
 * @desc    Delete A chat message
 * @param   {String} chatMsgId
 * @return  {Boolean}
 */
router.delete('/delete/:id', (req, res) => {
    const chatMsgId = req.params.id;
    ChatDetail.findById(chatMsgId)
        .then(chat => chat.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

/**
 * @route  POST api/chats/update/:id
 * @desc   Update chat Messages
 * @param   {String} chatMsgId
 */
router.post('update/:id', (req, res) => {
    const chatMsgId = req.params.id;
    ChatDetail.findById(chatMsgId).exec(function (err, result) {
        result.set({
            chatMsg: req.body.chatMsg,
            msgBy: req.body.msgBy
        });
        result.save(function (err, newResult) {
            if (err) {
                console.log(err);
            } else {
                io.on('connection', function (socket) {
                    console.log('Msg updates....');
                    socket.on('getMsgBy', function(data) {
                        console.log(data);
                        socket.emit('msgData', {msgBy: data});
                    });

                    socket.on('msgToAll', function(data) {
                        //Send message to everyone
                        io.sockets.emit('newmsg', data);
                    });
                });
            }
        });
    });

});

// test routes
router.get('/test', (req, res, next) => {
    res.send('This route works fine');
});


module.exports = router;



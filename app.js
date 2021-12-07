const express = require('express');
const { ROWLOCK } = require('sequelize/dist/lib/table-hints');

const app = express();

const db = require('./models'); //index파일을 알아서 찾아간다.

const { Member } = db;

app.use(express.json()); //middleware

app.get('/api/members', async (req, res) => {
    const { team } = req.query;
    if ( team ) {
        const teamMembers = await Member.findAll({ where: { team }});
        res.send(teamMembers);
    } else {
        const members = await Member.findAll();
        res.send(members);
    }
});

app.get('/api/members/:id', async (req,res) => {
    const { id } = req.params;
    const member = await Member.findOne({ where: { id } });
    if (member) {
        res.send(member);
    } else {
        res.status(404).send({ message : 'There is no member with the id!'});
    }
});

// app 객체의 post 함수 호출
app.post('/api/members', async (req, res) => {
    const newMember = req.body;
    const member = Member.build(newMember);
    await member.save();
    res.send(newMember);
});

//직원정보 업데이트
/* app.put('/api/members/:id', (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const member = members.find((m) => m.id === Number(id));
    if (member) { 
        Object.keys(newInfo).forEach((prop) => {
            member[prop] = newInfo[prop];
        });
        res.send(member);
    } else {
        res.status(404).send({ message: 'There is no member with the id!'});
    }
}); */

/* app.put('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const result = await Member.update(newInfo, { where: { id } });
    if (result[0]) { 
        res.send({ message: '${result[0]} row(s) affected'});
    } else {
        res.status(404).send({ message: 'There is no member with the id!'});
    }
}); */

app.put('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const member = await Member.findOne({ where: { id }});
    if (member) {
        Object.keys(newInfo).forEach((prop) => {
            member[prop] = newInfo[prop];
        });
        await member.save();
        res.send(member);
    } else {
        res.status(404).send({ message: 'There is no member with Id!'});
    }
});

/* app.delete('/api/members/:id', (req, res) => {
    const { id } = req.params;
    const membersCount = members.length;
    members = members.filter((member) => member.id !== Number(id));
    if (members.length < membersCount) {
        res.send({ message: 'Deleted'});
    } else {
        res.status(404).send({ message: 'There is no member with the id!'});
    }
}); */

app.delete('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const deletedCount = await Member.destroy({ where: { id }});
    if (deletedCount) {
        res.send({ message: '${deletedCount} row(s) deleted'});
    } else {
        res.status(404).send({ message: 'There is no member with the id!'});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is listening...');
});


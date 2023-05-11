const express = require('express')
const State = require('../model/State');
const fs = require('fs').promises;
const path = require('path');
//done and contig done
const getAllStates = async (req, res) => {
    let result = []
    const states = await State.find();
    if (!states) return res.status(204);
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    if(!req.query.contig) {
        newData.forEach((item) => {
            for(let i = 0;i<states.length;i++) {
                if(states[i].stateCode === item.code) {
                    item['funfacts'] = states[i].funfacts
                }
            }
        })
        res.json(newData)
    }
    else {
        if(req.query.contig.toString() == "false") {
            newData.forEach((item) => {
                if("AK" === item.code || "HI" === item.code) {
                    for(let i = 0;i<states.length;i++) {
                        if(states[i].stateCode === item.code) item['funfacts'] = states[i].funfacts
                    }
                    result.push(item)
                }
            })
            res.json(result);
        }
        else {
            newData.forEach((item) => {
                if("AK" === item.code || "HI" === item.code) return
                for(let i = 0;i<states.length;i++) {
                    if(states[i].stateCode === item.code) item['funfacts'] = states[i].funfacts
                }
                result.push(item)
            })
            res.json(result);
        }
    }
}
//done
const getState = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    const state = await State.findOne({ stateCode: s }).exec();
    if (!state) {
        res.json(result)
    }
    else {
        result[0]['funfacts'] = state.funfacts
        res.json(result);
    }
}
//done
const getStateFunfact = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    const state = await State.findOne({ stateCode: s }).exec();
    if (!state) return res.status(404).json({ 'message': `No Fun Facts found for ${result[0]['state']}`})
    const x = Math.floor(Math.random() * state.funfacts.length)
    res.json(state.funfacts[x])
}
//done
const createNewStateFunfact = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    if (!req?.body?.funfacts) return res.status(400).json({ "message": "State fun facts value required" })
    const state = await State.findOne({ stateCode: s }).exec();
    if (!state) {
        try {
            await State.create(
                {'stateCode': s},
                {$push: { funfacts: req.body.funfacts}}
            );
        } catch (err) {
            return res.status(400).json({"message": "State fun facts value must be an array"})
        }
    }
    else {
        try {
            await State.updateOne(
                {_id: state._id},
                {$push: {funfacts: { $each: req.body.funfacts}}}
            );
        } catch (err) {
            return res.status(400).json({"message": "State fun facts value must be an array"})
        }
    }
    const newState = await State.findOne({ stateCode: s }).exec();
    res.json(newState)
}
//done
const updateStateFunfact = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    if(!req?.body?.index) return res.status(400).json({ "message": "State fun fact index value required" })
    const index = req.body.index - 1
    if(!req?.body?.funfact) return res.status(400).json({ "message": "State fun fact value required" })
    const state = await State.findOne({ stateCode: s }).exec();
    if(!state) return res.status(404).json({"message": `No Fun Facts found for ${result[0]['state']}`})
    if(!state.funfacts[index]) return res.status(404).json({"message": `No Fun Fact found at that index for ${result[0]['state']}`})
    try {
        await State.findOneAndUpdate(
            {_id: state._id},
            {$set: { [`funfacts.${index}`]: req.body.funfact}}
        )
    } catch (err) {
        console.log(err)
    }
    const newState = await State.findOne({ stateCode: s }).exec();
    res.json(newState)
}
//done
const deleteStateFunfact = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    if(!req?.body?.index) return res.status(400).json({ "message": "State fun fact index value required" })
    const index = req.body.index - 1
    const state = await State.findOne({ stateCode: s }).exec();
    if(!state) return res.status(404).json({"message": `No Fun Facts found for ${result[0]['state']}`})
    if(!state.funfacts[index]) return res.status(404).json({"message": `No Fun Fact found at that index for ${result[0]['state']}`})
    state.funfacts.splice(index, 1)
    try {
        await State.updateOne(
            {_id: state._id},
            {$set: {funfacts: state.funfacts}}
        );
    } catch (err) {
        console.log(err)
    }
    const newState = await State.findOne({ stateCode: s }).exec();
    res.json(newState)
}
//done
const getStateCapital = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    res.json({"state":result[0].state,"capital":result[0].capital_city})
}
//done
const getStateNickname = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    res.json({"state":result[0].state,"nickname":result[0].nickname})
}
//done
const getStatePopulation = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    res.json({"state":result[0].state,"population":result[0].population})
}
//done
const getStateAdmission = async (req, res) => {
    let result = []
    const data = await fs.readFile(path.join(__dirname, '..', 'model', 'statesData.json'))
    let newData = JSON.parse(data)
    const s = req.params.state.toUpperCase()
    newData.forEach((item) => {
        if(s === item.code) result.push(item)
    })
    if(result == []) return res.status(400).json({ "message": "Invalid state abbreviation parameter." })
    res.json({"state":result[0].state,"admitted":result[0].admission_date})
}

module.exports = {
    getAllStates,
    createNewStateFunfact,
    updateStateFunfact,
    deleteStateFunfact,
    getState,
    getStateFunfact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission
}
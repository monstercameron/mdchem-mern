import React, { Component } from 'react'
import {
    Row,
    Col,
    Button
} from "reactstrap"
import Explain from '../widgets/Explain'
class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    levelDescription = () => {
        switch (this.props.levelId) {
            case '1b':
            case '2b':
            case '3b':
            case '4b':
            case '1a':
            case '2a':
            case '3a':
            case '4a': return `Out of the pool of elements, drag and drop those that are group elements to the available spots`
            case '5':
            case '8': return `This is the mastery level. You have 8 seconds to answer the given question. If you get 15 correct you will progress to the next level if you get 6 wrong you will rewatch the animations and be given another chance.`
            case '6': return `Out of the pool of elements, drag and drop those that form +1 charges to the available spots.`
            case '7': return `Out of the pool of elements, drag and drop those that form charges to the available spots`
            case '9': return `Drag and drop polyatomic ions to match their names.`
            case '10': return `Drag and drop the correct numbers of cations and anions in the correct order to write formulas of ionic compounds`
            default: return `No description found.`
        }
    }
    explainCorrect = () => {
        return this.props.correct.map((elem, index) => {
            const group = elem.split('=')
            // console.log(group)
            // return `[${group[0]} ${group[1]}]`
            return <Explain levelId={this.props.levelId} Id={index} state={true} key={index} reason={group[0]} data={group[1]}/>
        })
    }
    explainIncorrect = () => {
        return this.props.incorrect.map((elem, index) => {
            const group = elem.split('=')
            // console.log(group)
            // return `[${group[0]} ${group[1]}]`
            return <Explain levelId={this.props.levelId} Id={index} state={false} key={index} reason={group[0]} data={group[1]}/>
        })
    }
    render() {
        // console.log('The props', this.props)
        return (
            <Col sm={12} className='m-2 shadow-lg p-3'>
                <Row>
                    <Col sm={10}>
                        <Row>
                            <Col sm={3}><h3>Level</h3></Col>
                            <Col sm={9} className=''>{this.props.levelId}</Col>
                            <Col sm={3}><h3>Level description</h3></Col>
                            <Col sm={9} className=''>{this.levelDescription()}</Col>
                            <Col sm={3}><h3>Score</h3></Col>
                            <Col sm={9} className=''>{this.props.score}</Col>
                            <Col sm={3}><h3>Correct</h3></Col>
                            <Col sm={9} className='border rounded p-2'>{this.explainCorrect()}</Col>
                            <Col sm={3} className='mt-2'><h3>Incorrect</h3></Col>
                            <Col sm={9} className='border rounded p-2 mt-2'>{this.explainIncorrect()}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Button color='danger'>
                                    Erase
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Data
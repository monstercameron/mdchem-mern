import React, { Component } from 'react'
import { Col, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
class Explain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            AlkaliMetals: [
                'Lithium',
                'Li',
                'Sodium ',
                'Na',
                'Potassium ',
                'K',
                'Rubidium',
                'Rb',
                'Cesium ',
                'Cs',
                'Francium ',
                'Fr',
            ],
            transMetal:[
                'Scandium','Sc',
                'Titanium','Ti',
                'Vanadium','V',
                'Chromium','Cr',
                'Manganese','Mn',
                'Iron','Fe',
                'Cobalt','Co',
                'Nickel','Ni',
                'Copper','Cu',
                'Zinc','Zn',
                'Yttrium','Y',
                'Zirconium','Zr',
                'Niobium','Nb',
                'Molybdenum','Mo',
                'Technetium','Tc',
                'Ruthenium','Ru',
                'Rhodium','Rh',
                'Palladium','Pd',
                'Silver','Ag',
                'Cadmium','Cd',
                'Lanthanum',
                'Hafnium','Hf',
                'Tantalum','Ta',
                'Tungsten','T',
                'Rhenium','Re',
                'Osmium','Os',
                'Iridium','Ir',
                'Platinum','Pt',
                'Gold','Au',
                'Mercury','Hg',
                'Actinium','',
                'Rutherfordium','Rf',
                'Dubnium','Db',
                'Seaborgium','Sq',
                'Bohrium','Bh',
                'Hassium','Hs',
                'Meitnerium','Mt',
                'Darmstadtium','Ds',
                'Roentgenium','Rg',
                'Copernicium ','Cn'
            ],
            mettaloids:[
                'Boron','B',
                'Silicon','Si',
                'Germanium','Ge',
                'Arsenic','As',
                'Antimony','Sb',
                'Tellurium','Te'
            ],
            halogens:[
                'Fluorine','F',
                'Chlorine','Cl',
                'Bromine','Br',
                'Iodine','I',
                'Astatine','At'
            ],
            group5A:[
                'Nitrogen','N',
                'Phosphorus','P',
                'Arsenic','As',
                'Antimony','Sb',
                'Bismuth','Bi'
            ],
            group6A:[
                'Oxygen','O',
                'Sulfur','S',
                'Selenium','Se',
                'Tellurium','Te',
                'Polonium','Po'
            ],
            chargeMinus1:[
                'Fluorine','F',
                'Chlorine','Cl',
                'Bromine','Br',
                'Iodine','I',
                'Astatine','At',
            ],
            chargeMinus2:[
                'Oxygen','O',
                'Sulfur','S',
                'Selenium','Se',
            ],
            chargeMinus3:[
                'Nitorgen','N',
                'Phosphorus','P'
            ],
            chargePlus1:[
                'Hydrogen','H',
                'Lithium','Li',
                'Sodium','Na',
                'Potassium','K',
                'Rubidium','Rb',
                'Caesium','Cs',
                'Francium','Fr'
            ],
            chargePlus2:[
                'Beryllium','Be',
                'Magnesium','Mg',
                'Calcium','Ca',
                'Strontium','Sr',
                'Barium','Ba',
                'Radium','Ra'
            ]
        }
    }
    toggle = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen })
    }
    explanation = () => {
        switch (this.props.levelId) {
            case '1b':
            case '2b':
            case '3b':
            case '4b':
            case '1a':
            case '2a':
            case '3a':
            case '4a': return this.matchType()
            case '5': 
            case '8': return this.quizType()
            case '6': 
            case '7': return this.matchType()
            case '9': return this.level9()
            default: return 'test'
        }
    }
    explain = () => {
        if (this.props.reason === 'AlkaliMetals') {
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.AlkaliMetals.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === 'Metalloids'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.mettaloids.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`

        }else if(this.props.reason === 'Halogens'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.halogens.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '5A'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.group5A.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '6A'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.group6A.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '-1'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.chargeMinus1.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '-2'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.chargeMinus2.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '-3'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.chargeMinus3.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '+1'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.chargePlus1.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }else if(this.props.reason === '+2'){
            const dataList = this.props.data.split(/(?=[A-Z])/)
            let notIn = []
            for (const elem of dataList) {
                if (!this.state.chargePlus2.includes(elem)) {
                    notIn.push(elem)
                }
            }
            return `${notIn} ${notIn.length>1?'don\'t':'doesn\'t'} belong to ${this.props.reason}`
        }
    }
    matchType = () => {
        return (
            <React.Fragment>
                <Button id={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`} className='m-1' type="button" color={this.props.state ? 'success' : 'danger'}>
                    '{this.props.data}' are {this.props.reason}
                </Button>
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`}
                    toggle={this.toggle}
                >
                    <PopoverHeader>Explanation</PopoverHeader>
                    <PopoverBody>{this.props.state ? 'Answer is correct' : this.explain()}</PopoverBody>
                </Popover>
            </React.Fragment>
        )
    }
    quizType = () => {
        return (
            <React.Fragment>
                <Button id={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`} className='m-1' type="button" color={this.props.state ? 'success' : 'danger'}>
                    {this.props.reason}
                </Button>
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`}
                    toggle={this.toggle}
                >
                    <PopoverHeader>Explanation</PopoverHeader>
                    <PopoverBody>{this.props.state ? 'Answer is true' : 'Was answered incorrectly'}</PopoverBody>
                </Popover>
            </React.Fragment>
        )
    }
    buildType = () => { 
        return (
            <React.Fragment>
                <Button id={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`} className='m-1' type="button" color={this.props.state ? 'success' : 'danger'}>
                    {this.props.reason}
                </Button>
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`}
                    toggle={this.toggle}
                >
                    <PopoverHeader>Explanation</PopoverHeader>
                    <PopoverBody>{this.props.state ? 'Answer is true' : 'Was answered incorrectly'}</PopoverBody>
                </Popover>
            </React.Fragment>
        )
    }
    level9 = () => {
        return (
            <React.Fragment>
                <Button size="sm" id={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`} className='' type="button" color={this.props.state ? 'success' : 'danger'}>
                    Asked for {this.props.reason} {this.props.state? 'and':'but'} received {this.props.data}
                </Button>
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target={`button${this.props.levelId}${this.props.Id}${this.props.state ? 'correct' : 'incorrect'}`}
                    toggle={this.toggle}
                >
                    <PopoverHeader>Explanation</PopoverHeader>
                    <PopoverBody>{this.props.state ? 'Answer is true' : 'Was answered incorrectly'}</PopoverBody>
                </Popover>
            </React.Fragment>
        )

    }
    render() {
        // console.log('explain:', this.props)
        return (
            <Col className='d-inline-block'>
                {this.explanation()}
            </Col>
        );
    }
}
export default Explain;
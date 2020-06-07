import React from 'react';
import options from '../../../../config/blouseOptions';

export default class BlouseOptions extends React.Component{
    constructor(props) {
        super(props);
        const {selectedItem, lining} = props;
        this.state = {
            selectedItem : selectedItem,
            lining : lining
        }
        this.setItem = this.setItem.bind(this);
        this.setLinig = this.setLinig(this);
    }

    setItem(selectedItem){

    }

    setLinig(lining){

    }

    render(){
        console.log("optionss", options)
        return <div>
            {options.types.map((item, index) => {
                return <div className="customRadio" key={index}>
                    <input 
                        id={index} 
                        type="radio" 
                        name="stitchingTypes" 
                        value={item.rate} 
                    />
                    <label htmlFor={index}>{item.type}</label>
                </div>
            })}
        </div>
    }
}
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import Odometer from 'react-odometerjs';
import { withRouter } from 'react-router-dom';

class TickerChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tickerSymbol: this.props.tickerSymbol,
            closePrice: this.props.close,
            change: parseFloat(this.props.close - this.props.open).toFixed(2), 
            percentChange: parseFloat(((this.props.close - this.props.open)/this.props.open)*100).toFixed(2),
            open: this.props.open,
            timeFrame: this.props.timeFrame,
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }


    componentDidMount(){
        this.setState({
            timeFrame: this.props.timeFrame,
            change: parseFloat(this.props.close - this.props.open).toFixed(2),
            percentChange: parseFloat(((this.props.close - this.props.open)/this.props.open)*100).toFixed(2),
            open: this.props.open
        })
    }

    componentDidUpdate(){
        if(this.state.timeFrame !== this.props.timeFrame){ 
            this.setState({
                timeFrame: this.props.timeFrame,
                change: parseFloat(this.props.close - this.props.open).toFixed(2),
                percentChange: parseFloat(((this.props.close - this.props.open)/this.props.open)*100).toFixed(2)
            })

        }
    }

    // Create mouse over chart effect
    handleMouseOver(e){
        if(e && e.activePayload !== undefined){

            let hoverPrice = e.activePayload[0].payload.price;
            let openPrice = this.state.open;
            let change = hoverPrice - openPrice;
            let dailyPercentChange = (change/hoverPrice)*100
            this.setState({
                closePrice: parseFloat(e.activePayload[0].payload.price).toFixed(2), 
                change: parseFloat(change.toFixed(2)),
                percentChange: parseFloat(dailyPercentChange).toFixed(2)
            })
        }
    }

    // Handle mouse out effect to return to last price changes
    handleMouseOut(e){
        let currentChange = (this.props.close - this.props.open)
        let currentPercentChange = (currentChange/this.props.close)*100
        
        this.setState({
            closePrice: this.props.close, 
            change: parseFloat(currentChange).toFixed(2), 
            percentChange: parseFloat(currentPercentChange).toFixed(2)
        })
    }

    
    render(){
        
        let data = this.props.ticker || [];
        const label = this.props.timeFrame === "1D" ? "label" : "date";

        return (
            <div className="ticker-chart block-paddings">
                <h1>{this.props.tickerSymbol.toUpperCase()}</h1>
                <h3>$<Odometer value={this.state.closePrice}/></h3>
                <p>{`$${this.state.change}`} {`(${this.state.percentChange}%)`}</p>

                <LineChart 
                    width={646} 
                    height={196} 
                    data={data}
                    margin={{top: 5, right: 10, left: 10, bottom: 5}}
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseOut}
                >
                    <XAxis dataKey={label} hide={true} />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                    <Tooltip className='tooltip'
                                    contentStyle={{ border: '0', backgroundColor: 'transparent', color: 'grey'}}
                                    formatter={(value, name, props) => { return [""] }}
                                    isAnimationActive={false} cursor={{ stroke: "Gainsboro", strokeWidth: 1.5 }}/> 
                    <Line connectNulls type="linear" dataKey="price" dot={false} stroke={this.props.color} strokeWidth={1}/>
                </LineChart>
            </div>
            ) 
            
    }
}


export default withRouter(TickerChart);
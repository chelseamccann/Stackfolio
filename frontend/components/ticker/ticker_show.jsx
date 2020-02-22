import React from 'react';
import TickerChart from './ticker_chart';
import { fetchDailyPrices, fetchPrices } from '../../util/ticker_price_util'; 

class TickerShow extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            "1D": [],
            "5dm": [],
            "1mm": [],
            "3M": [],
            "1Y": [],
            "5Y": [],
            timeFrame: "",
            tickerSymbol: "",
            open: null,
            close: null,
            change: 0,
            changePercent: 0,
        }
        this.updatePrices = this.updatePrices.bind(this);
        this.tickerRating = this.tickerRating.bind(this);
    }

    componentDidMount(){
        fetchDailyPrices(this.props.tickerSymbol).then(response => this.renderDaily(response));
        // fetchAnalystRatings(this.props.tickerSymbol).then(ratings => { this.tickerRating(ratings) });
    }

    componentDidUpdate(prevProps){
        let prev = prevProps.tickerSymbol || prevProps.match.params.tickerSymbol
        if (this.props.tickerSymbol !== prev){
            fetchDailyPrices(this.props.tickerSymbol).then(response => this.renderDaily(response));
            // fetchAnalystRatings(this.props.tickerSymbol).then(ratings => { this.tickerRating(ratings) });
        }
    }

    renderDaily(response){
        const daily = response.map(price => {
            return {label: price.label, price: price.close}
        })

        let lastValidIdx = response.length - 1
        while(response[lastValidIdx].close === null){
            lastValidIdx -= 1
        }
        let lastValidClose = response[lastValidIdx].close

        let firstValidIdx = 0
        while(response[firstValidIdx].close === null){
            firstValidIdx += 1
        }
        let firstValidOpen = response[firstValidIdx].open
        let currentMinute = response[lastValidIdx].minute
        let currentDate = new Date(Date.parse(`${response[lastValidIdx].date} ${currentMinute}`))
        let closeTime = "16:00"
        let closeDate = new Date(Date.parse(`${response[lastValidIdx].date} ${closeTime}`))

        while (currentDate < closeDate){
            currentDate = new Date(currentDate.setMinutes(currentDate.getMinutes()+1))
            daily.push({label: currentDate.toLocaleTimeString([], {timeStyle: 'short'}), price: null})
        }

        this.setState({
            "1D": daily, 
            timeFrame: "1D", 
            tickerSymbol: this.props.tickerSymbol, 
            open: firstValidOpen, 
            close: lastValidClose, 
            change: parseFloat(lastValidClose - firstValidOpen).toFixed(2),
            changePercent: parseFloat(((lastValidClose - firstValidOpen)/firstValidOpen)*100).toFixed(2),
            dailyDone: true,
            colorClass: firstValidOpen < lastValidClose ? "activeGreen" : "activeRed",
            color: firstValidOpen < lastValidClose ? "#21ce99" : "#f45531",
            backgroundColor: firstValidOpen < lastValidClose ? "activeGreenBackground" : "activeRedBackground"
             })

    }

    renderPrices(response, timeFramePassed){
        const data = response.map(price => {
            
            return {
                price: price.close, 
                date: timeFramePassed==="3M" || timeFramePassed==="1Y" || timeFramePassed==="5Y"  ? price.date : new Date(Date.parse(`${price.date} ${price.label}`)).toLocaleString('en-US'),
                open: price.open, 
                change: price.change, 
                changePercent: price.changePercent
            }
        })
        
        this.setState({
            [timeFramePassed]: data, 
            timeFrame: timeFramePassed, 
            tickerSymbol: this.props.tickerSymbol, 
            open: response[0].open,
            close: response[response.length-1].close,
            change: response[response.length-1].change,
            changePercent: response[response.length-1].changePercent,
            colorClass: response[0].open < response[response.length-1].close ? "activeGreen" : "activeRed",
            color: response[0].open < response[response.length-1].close ? "#21ce99" : "#f45531",
            backgroundColor: response[0].open < response[response.length-1].close ? "activeGreenBackground" : "activeRedBackground"

        })
    }

    updatePrices(timeFrame){
        if (this.state.timeFrame !== timeFrame){
            return e => {
                timeFrame === "1D" ? fetchDailyPrices(this.props.tickerSymbol).then(response => this.renderDaily(response)) : fetchPrices(this.props.tickerSymbol, timeFrame).then(response => this.renderPrices(response, timeFrame)) 
            }
            
        }
    }

    tickerRating(ratings){
        let rating;
        let ratingNumber;
        let netRatings = ratings[0].ratingBuy + ratings[0].ratingSell + ratings[0].ratingHold;
        if (ratings[0].ratingBuy > ratings[0].ratingSell && ratings[0].ratingBuy > ratings[0].ratingHold){
            ratingNumber = Math.round((ratings[0].ratingBuy / netRatings) *1e2)/1e2 *100
            rating = `${Math.round(ratingNumber * 1e2) /1e2}% Buy`
        } else if (ratings[0].ratingSell > ratings[0].ratingBuy && ratings[0].ratingSell > ratings[0].ratingHold){
            ratingNumber = Math.round((ratings[0].ratingSell / netRatings) *1e2)/1e2 *100
            rating = `${ratingNumber}% Sell`
        } else if (ratings[0].ratingHold > ratings[0].ratingBuy && ratings[0].ratingHold > ratings[0].ratingSell){
            ratingNumber = Math.round((ratings[0].ratingHold / netRatings) *1e2)/1e2 *100
            rating = `${ratingNumber}% Hold`
            `${Math.round((Math.round(ratingNumber) / Math.round(netRatings)) *1e2)/1e2 *100}%`
        }
        this.setState({ 
            rating: rating, 
            buyRating: ratings[0].ratingBuy, 
            sellRating: ratings[0].ratingSell, 
            holdRating: ratings[0].ratingHold, 
            netRatings: netRatings,
            isLoading: false,
            ratingNumber: ratingNumber
        }) 
    }

    render(){
        const tF = Object.keys(this.state).map(key => {
            if (key==="1D" || key==="5dm" || key==="1mm" || key==="3M" || key==="1Y" || key==="5Y"){
                return <button className={`btns ${this.state.timeFrame === key ? this.state.colorClass : ''}`} key={`${key}-id`} onClick={this.updatePrices(key)} >{key.slice(0, 2).toUpperCase()}</button>   
            }
        })

        if(this.state.timeFrame !== ""){
            let data = this.state[this.state.timeFrame].slice()
            
            return (
                <div className="show-wrap">
                    <div className="chart-info-wrap">
                    <div className="chart-wrap"> 

                        <div className={`ticker-info-bubbles ${this.state.colorClass}`}>
                            <div className={`bubble ${this.state.backgroundColor}`}>
                                {this.state.sector}
                            </div>
                            <div className={`bubble ${this.state.backgroundColor}`}>
                                {this.state.industry}
                            </div>
                        </div>
                        <div className="bubble rating">{this.state.rating}</div>
                        <h1 className="company-name">{this.state.name}</h1>

                        <TickerChart 
                        ticker={data}
                        tF={tF}
                        color={this.state.color}
                        tickerSymbol={this.props.tickerSymbol}
                        timeFrame={this.state.timeFrame}
                        open={this.state.open}
                        close={this.state.close}
                        change={this.state.change}
                        changePercent={this.state.changePercent}
                        />
                        
                        <div className="time-frame-buttons">{tF}</div>

                    </div>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
        }
}

export default TickerShow;
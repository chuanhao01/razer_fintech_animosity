import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Axios from 'axios';



class RewardCard extends React.Component {
    render(){
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.props);
            Axios.defaults.baseURL = 'http://localhost:3001';
            Axios.post(`/buy/rewards/${this.props.rId}`)
            .then(
                function(res){
                    console.log(res);
                }
            );
        }
        return (
            <React.Fragment>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            Price: {this.props.price}
                        </Card.Text>
                        <form>
                            <Button variant="primary" onClick={handleSubmit}>Buy</Button>
                        </form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
};

class rewards extends React.Component {
    constructor() {
        super();
        this.state = {rewards: []}
    }
    componentDidMount(){
        Axios.defaults.baseURL = 'http://localhost:3001';
        Axios.get('/rewards')
        .then(
            function(res){
                this.setState({rewards: res.data.data});
                console.log(res);
            }.bind(this)
        )
    }
    render() {
        const {rewards} = this.state;
        return (
            <React.Fragment>
                <div>
                    {rewards.map((reward, i) => <RewardCard key={i} rId={reward.id || 0} name={reward.name} price={1000}>

                    </RewardCard>)}
                </div>
            </React.Fragment>
        )
    }
}

export default rewards
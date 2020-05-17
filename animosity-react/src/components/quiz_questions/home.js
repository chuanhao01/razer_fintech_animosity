import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Axios from 'axios';

class RewardCard extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
        }
    }
    render(){
        const handleChange = (e) => {
            const { id, value } = e.target
            this.setState(prevState => ({
                ...prevState,
                [id]: value
            }))
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.props);
            const payload = {
                ans: this.state.username,
            }
            Axios.defaults.baseURL = 'http://localhost:3001';
            Axios.post(`/question/answer/${this.props.qId}`, payload, {
                withCredentials: true,
            })
            .then(
                function(res){
                    console.log(res);
                }
            );
        }
        return (
            <React.Fragment>
                <Card style={{ width: '18rem' }} >
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.desc}
                        </Card.Text>
                        <form>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputusername1">Answer</label>
                                <input type="username"
                                    className="form-control"
                                    id="username"
                                    aria-describedby="usernameHelp"
                                    placeholder="Question ans here"
                                    value={this.state.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button variant="primary" onClick={handleSubmit}>Buy</Button>
                        </form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
};

class Home extends React.Component {
    constructor() {
        super();
        this.state = {rewards: []}
    }
    componentDidMount(){
        Axios.defaults.baseURL = 'http://localhost:3001';
        Axios.get('/questions', {
            withCredentials: true,
        })
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
                    {rewards.map((reward, i) => 
                    reward.done === 0
                    ? <RewardCard key={i} title={reward.title} desc={reward.description} qId={reward.questionid} points={reward.points}>
                    </RewardCard>
                    : <div key={i}></div>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default Home
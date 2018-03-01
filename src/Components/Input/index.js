import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import IconButton from "material-ui/IconButton";

import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import VisibilityOff from "material-ui-icons/VisibilityOff";

import { CircularProgress } from "material-ui/Progress";

export default class Twitter extends React.Component {
  static defaultProps = {
    maxLength: 160
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      tweet: ""
    };
  }
  onChange(e) {
    const tweet = e.target.value;
    this.setState({ tweet });
  }
  onSubmit(e) {
    this.setState({
      tweet: ""
    });
    e.preventDefault();
  }
  computePercentage() {
    return this.state.tweet.length / this.props.maxLength * 100;
  }
  render() {
    const { tweet } = this.state;
    const { maxLength } = this.props;
    const percentage = this.computePercentage();
    const isReachedLimit = tweet.length >= maxLength;
    const charactersLeft = maxLength - tweet.length;
    const isCloseToReachLimit = charactersLeft < 20;
    
    return (
      <form action="" onSubmit={this.onSubmit}>
        <FormControl fullWidth style={{ marginBottom: 20 }}>
          <InputLabel>What's Happening</InputLabel>
          <Input
            multiline
            value={tweet}
            onChange={this.onChange}
            endAdornment={
              <InputAdornment position="end">
                <CircularProgress
                  variant="determinate"
                  size={20}
                  value={percentage}
                />
              </InputAdornment>
            }
          />
          {isCloseToReachLimit && (
            <FormHelperText error={isReachedLimit}>
              {charactersLeft}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          disabled={isReachedLimit}
          fullWidth
          color="primary"
          variant="raised"
          type="submit"
        >
          Tweet
        </Button>
      </form>
    );
  }
}
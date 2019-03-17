import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Result from "./Result";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Input,
  Message
} from "semantic-ui-react";

class SimpleDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSubmitted: false,
      chartLabels: null,
      chartSeries: null,
      lastUrl: null,
      agreementError: null
    };
    this.analyze = this.analyze.bind(this);
  }
  analyze(e) {
    e.preventDefault();
    const url = e.target.elements.url.value;

    if (!e.target.elements.agreement.checked) {
      return this.setState({
        agreementError: "You have to agree!"
      });
    }
    this.setState({
      isLoading: true,
      isSubmitted: true,
      lastUrl: url
    });

    fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=accessibility&category=best-practices&category=performance&category=pwa&category=seo&url=${url}&key=${
        process.env.KEY
      }`
    )
      .then(response => response.json())
      .then(data => {
        const categories = data.lighthouseResult.categories;

        // Sort keys by ascending lighthouse scores!
        const categoryKeys = Object.keys(categories).sort(
          (firstKey, secondKey) => {
            return categories[secondKey].score - categories[firstKey].score;
          }
        );

        this.setState({
          chartLabels: categoryKeys.map(key => categories[key].title),
          chartSeries: categoryKeys.map(key =>
            (categories[key].score * 100).toFixed(2)
          ),
          isLoading: false
        });
      });
  }
  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">
          <Header.Content>Simple Lighthouse Dashboard</Header.Content>
        </Header>
        <section>
          <Form onSubmit={this.analyze}>
            <Form.Group inline>
              <label htmlFor="url">Enter a page</label>
              <Input
                placeholder="Enter URL here"
                type="url"
                name="url"
                required
                loading={this.state.isLoading}
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                name="agreement"
                label="I hereby grant permissions to analyze this website via an external PageSpeed Insights API call."
                required
              />
              {!!this.state.agreementError && (
                <Message negative>
                  <Message.Header>{this.state.agreementError}</Message.Header>
                </Message>
              )}
            </Form.Field>
            <Button animated>
              <Button.Content visible>Analyze!</Button.Content>
              <Button.Content hidden>
                <Icon name="chart pie" />
              </Button.Content>
            </Button>
          </Form>

          {this.state.isSubmitted && !this.state.isLoading && (
            <Fragment>
              <Divider horizontal>Results</Divider>
              <Result
                report={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(
                  this.state.lastUrl
                )}`}
                labels={this.state.chartLabels}
                series={this.state.chartSeries}
              />
            </Fragment>
          )}
        </section>
      </Container>
    );
  }
}

ReactDOM.render(<SimpleDashboard />, document.getElementById("dashboard"));

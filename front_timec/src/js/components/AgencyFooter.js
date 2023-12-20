import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
});

class AgencyFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {

        var brandUrl = "https://logsik.com";

        return (<div className="footer text-muted text-center">
            &copy; 2019 of TIMEC. Powered by <a href={brandUrl} target="_blank">Logsik Technology JSC</a>
        </div>);

    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(AgencyFooter);
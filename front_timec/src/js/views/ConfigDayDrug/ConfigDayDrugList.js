import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import { RenderInputWithDiv, RenderNumberInput } from '../../components/formInputs';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalConfigDayDrug from './ModalConfigDayDrug';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ConfigDayDrugList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ConfigDayDrugList extends React.Component {
    constructor() {
        super();
        this.state = {
            listConfigDayDrug: null,
            isConfigDayDrugModalShown: false,
            idConfigDayDrug: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.UpdateListConfigDayDrug = this.UpdateListConfigDayDrug.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isConfigDayDrugModalShown: false });
            this.UpdateListConfigDayDrug();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isConfigDayDrugModalShown: true,
            idConfigDayDrug: id
        });
    }
    UpdateListConfigDayDrug(value) {
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listConfigDayDrug: list }) }
        let search = null;
        if (value) {
            value.search ? search = value.search : search = null;
        }
        return agent.ConfigDayDrugAPI.list(search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    componentWillMount() {
        this.UpdateListConfigDayDrug();

    };

    deleteConfigDayDrug(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/configDayDrug/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const data = this.state.listConfigDayDrug;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo++}</td>
                    <td>{item.numberDay}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteConfigDayDrug(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Cấu Hình Cảnh Báo Hạn Thuốc</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.UpdateListConfigDayDrug)}>
                                <div className="row">
                                    <div className="page-header"> </div>
                                </div>
                                <div className="row">
                                    <div className="col col-md-12">
                                        <div className="col col-md-11" style={{ paddingLeft: "20px" }}>
                                            <Field name="search" label="Tìm theo số ngày" component={RenderNumberInput}></Field>
                                        </div>
                                        <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                            <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i>Tìm</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Số Ngày Còn Hạn Của Thuốc</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isConfigDayDrugModalShown ? <ModalConfigDayDrug
                                title={this.state.idConfigDayDrug ? "Chỉnh sửa cảnh báo thuốc" : "Thêm mới cảnh báo thuốc"}
                                idConfigDayDrug={this.state.idConfigDayDrug}
                                show={this.state.isConfigDayDrugModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listConfigDayDrug" />
                    </div>
                </div>
            </div>

        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ConfigDayDrugList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ConfigDayDrugList)));
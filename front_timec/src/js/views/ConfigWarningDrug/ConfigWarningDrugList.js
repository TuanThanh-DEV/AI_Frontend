import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import { RenderInputWithDiv } from '../../components/formInputs';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalConfigWarningDrug from './ModalConfigWarningDrug';
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
            meta: { form: "ConfigWarningDrugList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ConfigWarningDrugList extends React.Component {
    constructor() {
        super();
        this.state = {
            listConfigWarningDrug: null,
            isConfigWarningDrugModalShown: false,
            idConfigWarningDrug: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.UpdateListConfigWarningDrug = this.UpdateListConfigWarningDrug.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isConfigWarningDrugModalShown: false });
            this.UpdateListConfigWarningDrug();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isConfigWarningDrugModalShown: true,
            idConfigWarningDrug: id
        });
    }
    UpdateListConfigWarningDrug(value) {
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listConfigWarningDrug: list }) }
        let search = '';
        if (value) {
            value.search ? search = value.search : search = '';
        }
        return agent.ConfigWarningDrugAPI.list(search, page
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
        this.UpdateListConfigWarningDrug();

    };

    deleteConfigWarningDrug(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/configWarningDrug/${id}`;
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
        const data = this.state.listConfigWarningDrug;
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
                    <td>{item.drugOne.name}</td>
                    <td>{item.drugTwo.name}</td>
                    <td>{item.numberValidDate}</td>
                    <td>{item.description}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteConfigWarningDrug(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                            <li className="active">Cảnh Báo Kết Hợp Thuốc</li>
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
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.UpdateListConfigWarningDrug)}>
                                <div className="row">
                                    <div className="page-header"> </div>
                                </div>
                                <div className="row">
                                    <div className="col col-md-12">
                                        <div className="col col-md-11" style={{ paddingLeft: "20px" }}>
                                            <Field name="search" label="Tìm theo tên thuốc" component={RenderInputWithDiv}></Field>
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
                                            <th data-toggle="true">Thuốc Gốc </th>
                                            <th data-toggle="true">Thuốc Kết Hợp</th>
                                            <th data-toggle="true">Thời Gian Hiệu Lực</th>
                                            <th data-toggle="true">Chi Tiết Tác Dụng Phụ</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isConfigWarningDrugModalShown ? <ModalConfigWarningDrug
                                title={this.state.idConfigWarningDrug ? "Chỉnh sửa cảnh báo thuốc" : "Thêm mới cảnh báo thuốc"}
                                idConfigWarningDrug={this.state.idConfigWarningDrug}
                                show={this.state.isConfigWarningDrugModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listConfigWarningDrug" />
                    </div>
                </div>
            </div>

        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ConfigWarningDrugList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ConfigWarningDrugList)));
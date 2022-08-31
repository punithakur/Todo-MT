import React, { Component } from 'react'
import axios from 'axios'

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            show: true,
            category: '',
            task: '',
            where: '',
            date: '',
            status: true,
            allCategory: {},
            allTodo: [],
            statusTab:"all",

        }
    }
    componentDidMount() {
        this.handleGetAllTodo()
    }

    handleGetAllTodo = async () => {
        let data = await axios.get("http://localhost:3500/API/v1/getAllTodo")
        try {
            if (data.data) {
                data = data.data
                let category = this.groupBy(data, "category")
                this.setState({ allTodo1: data, allTodo: data, allCategory: category })
            }
        }
        catch { }
    }

    groupBy = (arr, name) => {
        let obj = {}
        arr.forEach(v => {
            if (obj[v[name]]) {
                obj[v[name]] = [...obj[v[name]], v]
            }
            else {
                obj[v[name]] = [v]
            }
        })
        return obj
    }
    handleCreateTODO = async () => {
        let { category, task, where, date, status } = this.state
        if (category && task && where && date && status) {
            let data = {
                "category": category,
                "task": task,
                "where": where,
                "date": date,
                "status": status
            }
            let allData = await axios.post("http://localhost:3500/API/v1/createTodo", data)

            try {
                console.log(allData.data)
                this.handleGetAllTodo()
            }
            catch { }
        }
        else{
            alert("Please fill all fields")
        }

    }

    handleForm = (event) => {
        let { value, name } = event.target
        this.setState({ [name]: value })
    }
    filterByStatus = (val) => {
        if (val === "all") {
            this.setState({ allTodo: this.state.allTodo1 ,statusTab:val})
        }
        else if (val === "active") {
            let data = this.state.allTodo1.filter(v => (v.status === true))
            this.setState({ allTodo: data ,statusTab:val})
        }
        else {
            let data = this.state.allTodo1.filter(v => (v.status === false))
            this.setState({ allTodo: data ,statusTab:val})
        }
    }
    handleUpdate=async(v,event)=>{
        let data = v
        if(event.target.checked){
            data.status= false

        }
        else{
            data.status= true
        }
       
        let updateApi = await axios.post("http://localhost:3500/API/v1/updateTodo",data)
        try{
          
        } 
        catch{}
    }
    handleDelete =async(v)=>{
        let data = v
        let deleteApi = await axios.post("http://localhost:3500/API/v1/deleteTodo",data)
        try{
              if(deleteApi.data){
                this.handleGetAllTodo()
              }
        }
        catch{}
    }
    render() {
        return (
            <div>
                <div>
                    <section className="gradient-form" style={{ backgroundColor: " #eee" }}>
                        <div className="container py-5 h-100">
                            {this.state.show ?
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-xl-10">
                                        <div className="card rounded-3 text-black">
                                            <div className="row g-0">

                                                <div className="col-lg-6 align-items-center gradient-custom-2">
                                                    <div className="text-white  px-3 py-4 p-md-5 mx-md-4">
                                                        <h1 className="mb-4">Summary</h1>
                                                        <ul>
                                                            <li>
                                                           <div className='row'>
                                                           <div className='col-md-10'>All Things</div>
                                                            <div className='col-md-2'>{this.state.allTodo.length}</div>
                                                           </div>
                                                            </li>
                                                            {
                                                                Object.keys(this.state.allCategory).map(v => (
                                                                    <li>
                                                                        <div  className='row'>
                                                                        <div className='col-md-10'>{v}</div> <div className='col-md-2'> {this.state.allCategory[v].length} </div>
                                                                        </div>
                                                                          
                                                                         </li>
                                                                ))
                                                            }

                                                        </ul>
                                                        <br />
                                                        <br />
                                                        <div>
                                                            <button className='btn text-center btnView mb-3' onClick={() => this.setState({ show: false })}>VIEW TASK</button>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="card-body p-md-5 mx-md-3">

                                                        <div className="text-align-right">
                                                            <h1 >New Task</h1>
                                                            <p className="mt-1 mb-4 pb-1">task for today</p>
                                                        </div>

                                                        <form>
                                                            <div className="form-group mb-2">
                                                                <input type="text" className="form-control form"
                                                                    placeholder="Business" name='category' onChange={(event) => this.handleForm(event)} />

                                                            </div>

                                                            <div className="form-group mb-2">
                                                                <input type="text" className="form-control form" placeholder='What I have to do?*' name='task' onChange={(event) => this.handleForm(event)} />

                                                            </div>
                                                            <div className="form-outline mb-2">
                                                                <input type="text" className="form-control form" placeholder='Where?*' name='where' onChange={(event) => this.handleForm(event)} />

                                                            </div>

                                                            <div className="d-flex  pb-2">
                                                                <div className="form-group ">
                                                                    <input type="date" className="form-control form" placeholder='When?*' name='date' onChange={(event) => this.handleForm(event)} />

                                                                </div>

                                                                <div className='col-md-3'>
                                                                    <label class="checkbox-inline">
                                                                        <input type="checkbox" data-toggle="toggle" /> All Day
                                                                    </label>
                                                                </div>

                                                            </div>
                                                            <a className="text-muted  mb-3" href="#!" style={{ float: "left" }}>Required Task*</a>

                                                            <div className="text-center ">
                                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 btnAdd" type="button" onClick={() => this.handleCreateTODO()}>Add Task</button>

                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-xl-10">
                                        <div className="card rounded-3 text-black">
                                            <div className="row g-0">
                                                <div className="col-lg-6">
                                                    <div className="card-body p-md-3 mx-md-3">

                                                        <div className="text-align-right">
                                                            <h1 className='mb-6'>My Task</h1>
                                                            <p className="mt-1 mb-4 pb-1">today</p>
                                                            {
                                                                this.state.allTodo.map(v => (
                                                                    <div className="card taskOutput mt-7">
                                                                        <div className="card-body">
                                                                       <div className='row'>
                                                                       <h5  className="col-md-10" style={{float:"left"}}>{v.task}</h5>
                                                                        {
                                                                            this.state.statusTab=== "all"?
                                                                            <div className='col-md-1'>
                                                                            <input type="checkbox" 
                                                                            defaultChecked={!v.status}
                                                                            onClick={(event)=>this.handleUpdate(v,event)}/>
                                                                         </div>
                                                                         : null
                                                                        }

                                                                         <div  className="col-md-1" >
                                                                        <span onClick={()=>this.handleDelete(v)}> <i class="fa fa-solid fa-trash"></i></span>
                                                                         </div>
                                                                       </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>

                                                        <div className='selctBtn'>
                                                            <div className='row g-0' >
                                                                <div className='col-md-3'>
                                                                    <button className='btn allbtn' onClick={() => this.filterByStatus("all")}> All</button>
                                                                </div>
                                                                <div className='col-md-5'>
                                                                    <button className='btn allbtn' onClick={() => this.filterByStatus("done")}>Done</button>
                                                                </div>
                                                                <div className='col-md-4' onClick={() => this.filterByStatus("active")}>
                                                                    <button className='btn allbtn'>Active</button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 gradient-custom-2">
                                                    <div className="text-white text-center px-3 py-4 p-md-5 mx-md-4">
                                                        <h1 className="mb-4">Hi!</h1>
                                                        <h5>Nothing to do yet, Think about it</h5>
                                                        <h5>Let's start!</h5>
                                                        <br />
                                                        <br />
                                                        <div>
                                                            <button className='btn text-center btnView mb-3' onClick={() => this.setState({ show: true })}>ADD TASK</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}



// Dark mode
let toggle = document.querySelector('.title .img');
let add = document.querySelector('.input span');
let footer = document.querySelector('.footer');
let all = document.querySelector('.all');
let active = document.querySelector('.active');
let completed = document.querySelector('.completed');
let clear = document.querySelector('.clear');
let ul = document.querySelector('ul');
toggle.addEventListener('click',()=> {
    toggle.classList.toggle('dark')
    document.body.classList.toggle('dark')
})

/*#################*/ 

let id = 0;
let arr = [];
let counter = arr.length;

if (localStorage.length) {
    arr = JSON.parse(localStorage.tasks)
    arr.forEach(element => {
        createTaske(element.task,element.id,element.completed)
    });
    id = arr.length;
    counter = arr.length;
    document.querySelector('.footer span').innerHTML = `${counter} items left`;
    
    document.querySelectorAll('ul input').forEach((e)=> {
        e.classList.contains('true')? e.click():'';
    })
}

function createTaske(value , id , completed=false) {
    let li = document.createElement('li');
    li.setAttribute('data-info',`${id}`);
    
    li.innerHTML = `
        <input class="checkbox ${completed} " type="checkbox" name="" id=${id}>
        <label for=${id}>${value}</label>
        <img src="/images/icon-cross.svg" alt="" id="remove">
    `
    ul.prepend(li);
    document.querySelector('.footer').style.display='flex';

}

function addToLocal(arr) {
    localStorage.setItem('tasks',JSON.stringify(arr))
}

add.addEventListener('click',()=> {
    let input = document.querySelector('.input input');
    if (input.value.trim() != '' ) {
        createTaske(input.value,id,false);
    arr.push({
        task: input.value,
        id:id,
        completed : false
    })
    addToLocal(arr)
    counter = arr.length;
    document.querySelector('.footer span').innerHTML = `${counter} items left`;
    }
    ++id;
})

document.addEventListener('click',(event)=> {
    if (event.target.id == 'remove') {
        arr.forEach((e,i)=> {
            if (event.target.parentElement.dataset.info == e.id) {
                arr.splice(i,1)
            }
        })

        addToLocal(arr)
        event.target.parentElement.remove()
        arr.length ==0 ?  document.querySelector('.footer').style.display='none':'';
        counter = arr.length;
        document.querySelector('.footer span').innerHTML = `${counter} items left`;
    }
    if (event.target.classList.contains('checkbox')) {
        arr.forEach((e,i)=> {
            if (event.target.parentElement.dataset.info == e.id ) {
                e.completed = event.target.checked
            }
        })
        addToLocal(arr)
    }

})

active.addEventListener('click',()=> {
    document.querySelectorAll('ul input').forEach((e)=> {
        e.checked ? e.parentElement.style.display='none':  e.parentElement.style.display='flex';
    })
})

completed.addEventListener('click',()=> {
    document.querySelectorAll('ul input').forEach((e)=> {
        !e.checked ? e.parentElement.style.display='none':  e.parentElement.style.display='flex';
    })
})

all.addEventListener('click',()=> {
    document.querySelectorAll('ul input').forEach((e)=> {
       e.parentElement.style.display='flex'
    })
})

clear.addEventListener('click',()=> {
    document.querySelectorAll('ul input').forEach((e)=> {
       if (e.checked) {
        let  clr = arr.filter((e)=> {
            return !e.completed
        })
        arr=clr;
        e.parentElement.remove();
        addToLocal(arr)
       }
    })
})



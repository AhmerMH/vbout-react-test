import React, { useState } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo, add, toggle } from './actions';

const Application = () => { 
  
  const historyState = useSelector( state => state.undoRedo); 

  const dispatch = useDispatch();

  const [grudges, setGrudges] = useState(initialState);
  
  const addGrudge = (grudge) => {
    grudge.id = id();
    grudge.forgiven = false;
    setGrudges([grudge, ...grudges]);
    dispatch(add(grudge));
  };

  const toggleForgiveness = (id) => { 
    setGrudges(
      grudges.map((grudge) => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );
    dispatch(toggle(id));
  };

  const historyEvent = (event) => { 
    if(event === 'UNDO') {
      dispatch(undo());
    } else {
      dispatch(redo());
    }

    const action = (historyState.expectedState && historyState.expectedState.action);
    const changeId = (historyState.expectedState && historyState.expectedState.id);

    
    if( action === 'TOGGLE' ) {
      setGrudges(
        grudges.map((grudge) => {
          if (grudge.id !== changeId) return grudge;
          return { ...grudge, forgiven: !grudge.forgiven };
        })
      );
    } else if ( action === 'ADD') { 
      if(event === 'UNDO') {
        grudges.shift();
        setGrudges([...grudges]);
      } else {
        setGrudges([historyState.expectedState.data, ...grudges]);
      }
    }
  }


  return (
    <div className="Application"> 
      <NewGrudge onSubmit={addGrudge} />
      <div className='d-flex mt-2'>
        <button className='w-50' onClick={() => historyEvent('UNDO')}> Undo </button>
        <button className='w-50' onClick={() => historyEvent('REDO')}> Redo </button>
      </div>
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;

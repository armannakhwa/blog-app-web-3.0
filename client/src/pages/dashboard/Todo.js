import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Card } from 'react-bootstrap';
import { useTodo, useTags } from './../../redux/hooks';

import Input from './../../atoms/Input';
import Button from './../../atoms/Button';

const Todo = ({ description, setModal }) => {
  const { addTodo, todo, loading, updateTodo } = useTodo();
  const [formData, setFormData] = useState({
    tag: !loading && description === 'Update' ? todo.tags[0].name : 'POST',
    tagId: !loading && description === 'Update' ? todo.tags[0]._id : '655b5abe61963e5f9766c256',
    text: !loading && description === 'Update' ? todo.text : '',
    title: !loading && description === 'Update' ? todo.title : ''
  });

  const { getTags, tags } = useTags();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const {title, text, tag, tagId } = formData;

  const onChange = (e) => {
    return setFormData(
      e.target.name === 'tag' && tagId !== '655b5abe61963e5f9766c2526'
        ? {
            ...formData,
            tagId: e.target.options[e.target.options.selectedIndex].getAttribute(
              'option-id'
            ),
            tag: e.target.value
          }
        : { ...formData, [e.target.name]: e.target.value }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    description === 'Add' && addTodo({title, text, tagId, tag });
    description === 'Update' && updateTodo({ title,text, tagId, tag }, todo._id);
    setModal({ isOpen: false });
  };
  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Card className="todo-form p-4">
      <Card.Body>
        <Row className="d-flex justify-content-between align-items-center mb-5">
          <Card.Title>{description} POST</Card.Title>

          <Row className="d-flex justify-content-between flex-nowrap"></Row>
        </Row>
        <Form>
          <Form.Row>
            <Col xs={12} sm={12} md={8}>
              <Input
                label="Title"
                id="todo-title"
                type="text"
                value={title}
                name="title"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <b>Content</b>
              <textarea
                label="Content"
                id="todo-text"
                type="text"
                value={text}
                style={{width:"269px"}}
                name="text"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </Col>
            <Col xs={12} sm={12} md={4}>
              {/* <Input
                as="select"
                label="POST Tag"
                id={`todo-tag-${description}`}
                type="text"
                value={tag}
                onChange={(e) => onChange(e)}
                name="tag"
                autoComplete="off"
                pClassName={tagId === '655b5abe61963e5f9766c256' ? 'd-none' : ''}
              > 
                {tags.map((tag) => {
                  return (
                    <option
                      disabled={tag._id === '655b5abe61963e5f9766c256'}
                      option-id={tag._id}
                      key={tag._id}
                    >
                      {tag.name}
                    </option>
                  );
                })}
              </Input>
              */}
              {/* <Input
                inputTextRight="X"
                inputTextRightOnClick={() => {
                  setFormData({ ...formData, tag: '', tagId: '' });
                }}
                label="Create a Tag"
                id={`todo-tag-other-${description}`}
                type="text"
                pClassName={tagId !== '655b5abe61963e5f9766c256' ? 'd-none' : 'd-block'}
                value={tagId === '655b5abe61963e5f9766c256' ? tag : ''}
                onChange={
                  tagId === '655b5abe61963e5f9766c256' ? (e) => onChange(e) : () => {}
                }
                name="tag"
                autoComplete="off"
              /> */}
            </Col>
          </Form.Row>

          <Button
            variant="secondary"
            text={description === 'Update' ? 'Update POST' : 'Add POST'}
            onClick={(e) => onSubmit(e)}
            color="white"
            type="submit"
            className="float-right"
            id={`todo-update-add-button-${description}`}
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Todo;

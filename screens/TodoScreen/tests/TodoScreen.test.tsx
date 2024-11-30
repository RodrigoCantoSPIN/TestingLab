import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TodoScreen from '..';

test('add item to list', () => {
  const {getByText, getByTestId} = render(<TodoScreen />);
  fireEvent.changeText(getByTestId('taskInput'), 'Item1');
  fireEvent.press(getByText('Add Task'));
  expect(getByText('Item1')).toBeTruthy(); // Initially fails
});

test('add item to list and then remove it ', () => {
  const {getByText, getByTestId, queryAllByText} = render(<TodoScreen />);
  // Given: The user adds a task
  fireEvent.changeText(getByTestId('taskInput'), 'Item1');
  fireEvent.press(getByText('Add Task'));
  expect(getByText('Item1')).toBeTruthy();
  // When: The user deletes the task
  fireEvent.press(getByText('Delete'));
  // Then: The task should not be on the list
  const items = queryAllByText('Item1');
  expect(items).toHaveLength(0);
});

test('task input with empty test', () => {
  // Given: The input is empty
  const {getByText, getByTestId} = render(<TodoScreen />);
  // When: The user tries to add a emptu task
  fireEvent.changeText(getByTestId('taskInput'), '');
  fireEvent.press(getByText('Add Task'));
  // Then: The error message should show up on the screen
  expect(getByTestId('txtError')).toBeTruthy();
});

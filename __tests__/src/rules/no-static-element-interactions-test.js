/* eslint-env jest */
/**
 * @fileoverview Enforce static elements have no interactive handlers.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-static-element-interactions';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errorMessage =
  'Static HTML elements with event handlers require a role.';

const expectedError = {
  message: errorMessage,
  type: 'JSXOpeningElement',
};

ruleTester.run('no-static-element-interactions', rule, {
  valid: [
    { code: '<TestComponent onClick={doFoo} />' },
    { code: '<Button onClick={doFoo} />' },
    { code: '<div />;' },
    { code: '<div className="foo" />;' },
    { code: '<div className="foo" {...props} />;' },
    { code: '<div onClick={() => void 0} aria-hidden />;' },
    { code: '<div onClick={() => void 0} aria-hidden={true} />;' },
    /* All flavors of input */
    { code: '<input onClick={() => void 0} />' },
    { code: '<input type="button" onClick={() => void 0} />' },
    { code: '<input type="checkbox" onClick={() => void 0} />' },
    { code: '<input type="color" onClick={() => void 0} />' },
    { code: '<input type="date" onClick={() => void 0} />' },
    { code: '<input type="datetime" onClick={() => void 0} />' },
    { code: '<input type="datetime-local" onClick={() => void 0} />' },
    { code: '<input type="email" onClick={() => void 0} />' },
    { code: '<input type="file" onClick={() => void 0} />' },
    { code: '<input type="image" onClick={() => void 0} />' },
    { code: '<input type="month" onClick={() => void 0} />' },
    { code: '<input type="number" onClick={() => void 0} />' },
    { code: '<input type="password" onClick={() => void 0} />' },
    { code: '<input type="radio" onClick={() => void 0} />' },
    { code: '<input type="range" onClick={() => void 0} />' },
    { code: '<input type="reset" onClick={() => void 0} />' },
    { code: '<input type="search" onClick={() => void 0} />' },
    { code: '<input type="submit" onClick={() => void 0} />' },
    { code: '<input type="tel" onClick={() => void 0} />' },
    { code: '<input type="text" onClick={() => void 0} />' },
    { code: '<input type="time" onClick={() => void 0} />' },
    { code: '<input type="url" onClick={() => void 0} />' },
    { code: '<input type="week" onClick={() => void 0} />' },
    /* End all flavors of input */
    { code: '<input type="hidden" onClick={() => void 0} />' },
    { code: '<button onClick={() => void 0} className="foo" />' },
    { code: '<menuitem onClick={() => {}} />;' },
    { code: '<option onClick={() => void 0} className="foo" />' },
    { code: '<select onClick={() => void 0} className="foo" />' },
    { code: '<textarea onClick={() => void 0} className="foo" />' },
    { code: '<a tabIndex="0" onClick={() => void 0} />' },
    { code: '<a onClick={() => void 0} href="http://x.y.z" />' },
    { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex="0" />' },
    { code: '<input onClick={() => void 0} type="hidden" />;' },
    { code: '<form onClick={() => {}} />;' },
    /* HTML elements attributed with an interactive role */
    { code: '<div role="button" onClick={() => {}} />;' },
    { code: '<div role="checkbox" onClick={() => {}} />;' },
    { code: '<div role="columnheader" onClick={() => {}} />;' },
    { code: '<div role="combobox" onClick={() => {}} />;' },
    { code: '<div role="form" onClick={() => {}} />;' },
    { code: '<div role="gridcell" onClick={() => {}} />;' },
    { code: '<div role="link" onClick={() => {}} />;' },
    { code: '<div role="menuitem" onClick={() => {}} />;' },
    { code: '<div role="menuitemcheckbox" onClick={() => {}} />;' },
    { code: '<div role="menuitemradio" onClick={() => {}} />;' },
    { code: '<div role="option" onClick={() => {}} />;' },
    { code: '<div role="radio" onClick={() => {}} />;' },
    { code: '<div role="rowheader" onClick={() => {}} />;' },
    { code: '<div role="searchbox" onClick={() => {}} />;' },
    { code: '<div role="slider" onClick={() => {}} />;' },
    { code: '<div role="spinbutton" onClick={() => {}} />;' },
    { code: '<div role="switch" onClick={() => {}} />;' },
    { code: '<div role="tab" onClick={() => {}} />;' },
    { code: '<div role="textbox" onClick={() => {}} />;' },
    { code: '<div role="treeitem" onClick={() => {}} />;' },
    /* Presentation is a special case role that indicates intentional static semantics */
    { code: '<div role="presentation" onClick={() => {}} />;' },
    /* HTML elements with an inherent, non-interactive role */
    { code: '<main onClick={() => void 0} />;' },
    { code: '<area onClick={() => {}} />;' },
    { code: '<article onClick={() => {}} />;' },
    { code: '<article onDblClick={() => void 0} />;' },
    { code: '<dd onClick={() => {}} />;' },
    { code: '<dfn onClick={() => {}} />;' },
    { code: '<dt onClick={() => {}} />;' },
    { code: '<fieldset onClick={() => {}} />;' },
    { code: '<figure onClick={() => {}} />;' },
    { code: '<frame onClick={() => {}} />;' },
    { code: '<h1 onClick={() => {}} />;' },
    { code: '<h2 onClick={() => {}} />;' },
    { code: '<h3 onClick={() => {}} />;' },
    { code: '<h4 onClick={() => {}} />;' },
    { code: '<h5 onClick={() => {}} />;' },
    { code: '<h6 onClick={() => {}} />;' },
    { code: '<hr onClick={() => {}} />;' },
    { code: '<img onClick={() => {}} />;' },
    { code: '<li onClick={() => {}} />;' },
    { code: '<nav onClick={() => {}} />;' },
    { code: '<ol onClick={() => {}} />;' },
    { code: '<table onClick={() => {}} />;' },
    { code: '<tbody onClick={() => {}} />;' },
    { code: '<tfoot onClick={() => {}} />;' },
    { code: '<thead onClick={() => {}} />;' },
    { code: '<tr onClick={() => {}} />;' },
    { code: '<ol onClick={() => {}} />;' },
    { code: '<ul onClick={() => {}} />;' },
    /* HTML elements attributed with an abstract role */
    { code: '<div role="command" onClick={() => {}} />;' },
    { code: '<div role="composite" onClick={() => {}} />;' },
    { code: '<div role="input" onClick={() => {}} />;' },
    { code: '<div role="landmark" onClick={() => {}} />;' },
    { code: '<div role="range" onClick={() => {}} />;' },
    { code: '<div role="roletype" onClick={() => {}} />;' },
    { code: '<div role="section" onClick={() => {}} />;' },
    { code: '<div role="sectionhead" onClick={() => {}} />;' },
    { code: '<div role="select" onClick={() => {}} />;' },
    { code: '<div role="structure" onClick={() => {}} />;' },
    { code: '<div role="widget" onClick={() => {}} />;' },
    { code: '<div role="window" onClick={() => {}} />;' },
    /* HTML elements attributed with a non-interactive role */
    { code: '<div role="alert" onClick={() => {}} />;' },
    { code: '<div role="alertdialog" onClick={() => {}} />;' },
    { code: '<div role="application" onClick={() => {}} />;' },
    { code: '<div role="article" onClick={() => {}} />;' },
    { code: '<div role="banner" onClick={() => {}} />;' },
    { code: '<div role="cell" onClick={() => {}} />;' },
    { code: '<div role="complementary" onClick={() => {}} />;' },
    { code: '<div role="contentinfo" onClick={() => {}} />;' },
    { code: '<div role="definition" onClick={() => {}} />;' },
    { code: '<div role="dialog" onClick={() => {}} />;' },
    { code: '<div role="directory" onClick={() => {}} />;' },
    { code: '<div role="document" onClick={() => {}} />;' },
    { code: '<div role="feed" onClick={() => {}} />;' },
    { code: '<div role="figure" onClick={() => {}} />;' },
    { code: '<div role="grid" onClick={() => {}} />;' },
    { code: '<div role="group" onClick={() => {}} />;' },
    { code: '<div role="heading" onClick={() => {}} />;' },
    { code: '<div role="img" onClick={() => {}} />;' },
    { code: '<div role="list" onClick={() => {}} />;' },
    { code: '<div role="listbox" onClick={() => {}} />;' },
    { code: '<div role="listitem" onClick={() => {}} />;' },
    { code: '<div role="log" onClick={() => {}} />;' },
    { code: '<div role="main" onClick={() => {}} />;' },
    { code: '<div role="marquee" onClick={() => {}} />;' },
    { code: '<div role="math" onClick={() => {}} />;' },
    { code: '<div role="menu" onClick={() => {}} />;' },
    { code: '<div role="menubar" onClick={() => {}} />;' },
    { code: '<div role="navigation" onClick={() => {}} />;' },
    { code: '<div role="note" onClick={() => {}} />;' },
    { code: '<div role="progressbar" onClick={() => {}} />;' },
    { code: '<div role="radiogroup" onClick={() => {}} />;' },
    { code: '<div role="region" onClick={() => {}} />;' },
    { code: '<div role="row" onClick={() => {}} />;' },
    { code: '<div role="rowgroup" onClick={() => {}} />;' },
    { code: '<div role="search" onClick={() => {}} />;' },
    { code: '<div role="separator" onClick={() => {}} />;' },
    { code: '<div role="scrollbar" onClick={() => {}} />;' },
    { code: '<div role="status" onClick={() => {}} />;' },
    { code: '<div role="table" onClick={() => {}} />;' },
    { code: '<div role="tablist" onClick={() => {}} />;' },
    { code: '<div role="tabpanel" onClick={() => {}} />;' },
    { code: '<td onClick={() => {}} />;' },
    { code: '<div role="term" onClick={() => {}} />;' },
    { code: '<div role="timer" onClick={() => {}} />;' },
    { code: '<div role="toolbar" onClick={() => {}} />;' },
    { code: '<div role="tooltip" onClick={() => {}} />;' },
    { code: '<div role="tree" onClick={() => {}} />;' },
    { code: '<div role="treegrid" onClick={() => {}} />;' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<div onClick={() => void 0} />;', errors: [expectedError] },
    { code: '<div onClick={() => void 0} role={undefined} />;', errors: [expectedError] },
    { code: '<div onClick={() => void 0} {...props} />;', errors: [expectedError] },
    { code: '<div onKeyUp={() => void 0} aria-hidden={false} />;', errors: [expectedError] },
    /* Static elements; no inherent role */
    { code: '<a onClick={() => void 0} />', errors: [expectedError] },
    { code: '<a onClick={() => {}} />;', errors: [expectedError] },
    { code: '<acronym onClick={() => {}} />;', errors: [expectedError] },
    { code: '<address onClick={() => {}} />;', errors: [expectedError] },
    { code: '<applet onClick={() => {}} />;', errors: [expectedError] },
    { code: '<aside onClick={() => {}} />;', errors: [expectedError] },
    { code: '<audio onClick={() => {}} />;', errors: [expectedError] },
    { code: '<b onClick={() => {}} />;', errors: [expectedError] },
    { code: '<base onClick={() => {}} />;', errors: [expectedError] },
    { code: '<bdi onClick={() => {}} />;', errors: [expectedError] },
    { code: '<bdo onClick={() => {}} />;', errors: [expectedError] },
    { code: '<big onClick={() => {}} />;', errors: [expectedError] },
    { code: '<blink onClick={() => {}} />;', errors: [expectedError] },
    { code: '<blockquote onClick={() => {}} />;', errors: [expectedError] },
    { code: '<body onClick={() => {}} />;', errors: [expectedError] },
    { code: '<br onClick={() => {}} />;', errors: [expectedError] },
    { code: '<canvas onClick={() => {}} />;', errors: [expectedError] },
    { code: '<caption onClick={() => {}} />;', errors: [expectedError] },
    { code: '<center onClick={() => {}} />;', errors: [expectedError] },
    { code: '<cite onClick={() => {}} />;', errors: [expectedError] },
    { code: '<code onClick={() => {}} />;', errors: [expectedError] },
    { code: '<col onClick={() => {}} />;', errors: [expectedError] },
    { code: '<colgroup onClick={() => {}} />;', errors: [expectedError] },
    { code: '<content onClick={() => {}} />;', errors: [expectedError] },
    { code: '<data onClick={() => {}} />;', errors: [expectedError] },
    { code: '<datalist onClick={() => {}} />;', errors: [expectedError] },
    { code: '<del onClick={() => {}} />;', errors: [expectedError] },
    { code: '<details onClick={() => {}} />;', errors: [expectedError] },
    { code: '<dir onClick={() => {}} />;', errors: [expectedError] },
    { code: '<div onClick={() => {}} />;', errors: [expectedError] },
    { code: '<dl onClick={() => {}} />;', errors: [expectedError] },
    { code: '<em onClick={() => {}} />;', errors: [expectedError] },
    { code: '<embed onClick={() => {}} />;', errors: [expectedError] },
    { code: '<figcaption onClick={() => {}} />;', errors: [expectedError] },
    { code: '<font onClick={() => {}} />;', errors: [expectedError] },
    { code: '<footer onClick={() => {}} />;', errors: [expectedError] },
    { code: '<frameset onClick={() => {}} />;', errors: [expectedError] },
    { code: '<head onClick={() => {}} />;', errors: [expectedError] },
    { code: '<header onClick={() => {}} />;', errors: [expectedError] },
    { code: '<hgroup onClick={() => {}} />;', errors: [expectedError] },
    { code: '<html onClick={() => {}} />;', errors: [expectedError] },
    { code: '<i onClick={() => {}} />;', errors: [expectedError] },
    { code: '<iframe onClick={() => {}} />;', errors: [expectedError] },
    { code: '<ins onClick={() => {}} />;', errors: [expectedError] },
    { code: '<kbd onClick={() => {}} />;', errors: [expectedError] },
    { code: '<keygen onClick={() => {}} />;', errors: [expectedError] },
    { code: '<label onClick={() => {}} />;', errors: [expectedError] },
    { code: '<legend onClick={() => {}} />;', errors: [expectedError] },
    { code: '<link onClick={() => {}} />;', errors: [expectedError] },
    { code: '<map onClick={() => {}} />;', errors: [expectedError] },
    { code: '<mark onClick={() => {}} />;', errors: [expectedError] },
    { code: '<marquee onClick={() => {}} />;', errors: [expectedError] },
    { code: '<menu onClick={() => {}} />;', errors: [expectedError] },
    { code: '<meta onClick={() => {}} />;', errors: [expectedError] },
    { code: '<meter onClick={() => {}} />;', errors: [expectedError] },
    { code: '<noembed onClick={() => {}} />;', errors: [expectedError] },
    { code: '<noscript onClick={() => {}} />;', errors: [expectedError] },
    { code: '<object onClick={() => {}} />;', errors: [expectedError] },
    { code: '<optgroup onClick={() => {}} />;', errors: [expectedError] },
    { code: '<output onClick={() => {}} />;', errors: [expectedError] },
    { code: '<p onClick={() => {}} />;', errors: [expectedError] },
    { code: '<param onClick={() => {}} />;', errors: [expectedError] },
    { code: '<picture onClick={() => {}} />;', errors: [expectedError] },
    { code: '<pre onClick={() => {}} />;', errors: [expectedError] },
    { code: '<progress onClick={() => {}} />;', errors: [expectedError] },
    { code: '<q onClick={() => {}} />;', errors: [expectedError] },
    { code: '<rp onClick={() => {}} />;', errors: [expectedError] },
    { code: '<rt onClick={() => {}} />;', errors: [expectedError] },
    { code: '<rtc onClick={() => {}} />;', errors: [expectedError] },
    { code: '<ruby onClick={() => {}} />;', errors: [expectedError] },
    { code: '<s onClick={() => {}} />;', errors: [expectedError] },
    { code: '<samp onClick={() => {}} />;', errors: [expectedError] },
    { code: '<script onClick={() => {}} />;', errors: [expectedError] },
    { code: '<section onClick={() => {}} />;', errors: [expectedError] },
    { code: '<small onClick={() => {}} />;', errors: [expectedError] },
    { code: '<source onClick={() => {}} />;', errors: [expectedError] },
    { code: '<spacer onClick={() => {}} />;', errors: [expectedError] },
    { code: '<span onClick={() => {}} />;', errors: [expectedError] },
    { code: '<strike onClick={() => {}} />;', errors: [expectedError] },
    { code: '<strong onClick={() => {}} />;', errors: [expectedError] },
    { code: '<style onClick={() => {}} />;', errors: [expectedError] },
    { code: '<sub onClick={() => {}} />;', errors: [expectedError] },
    { code: '<summary onClick={() => {}} />;', errors: [expectedError] },
    { code: '<sup onClick={() => {}} />;', errors: [expectedError] },
    { code: '<th onClick={() => {}} />;', errors: [expectedError] },
    { code: '<time onClick={() => {}} />;', errors: [expectedError] },
    { code: '<title onClick={() => {}} />;', errors: [expectedError] },
    { code: '<track onClick={() => {}} />;', errors: [expectedError] },
    { code: '<tt onClick={() => {}} />;', errors: [expectedError] },
    { code: '<u onClick={() => {}} />;', errors: [expectedError] },
    { code: '<var onClick={() => {}} />;', errors: [expectedError] },
    { code: '<video onClick={() => {}} />;', errors: [expectedError] },
    { code: '<wbr onClick={() => {}} />;', errors: [expectedError] },
    { code: '<xmp onClick={() => {}} />;', errors: [expectedError] },
  ].map(parserOptionsMapper),
});

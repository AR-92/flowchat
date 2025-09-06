const fs = require('fs');
const path = require('path');

describe('HTML Structure Validation', () => {
  let htmlContent;

  beforeAll(() => {
    // Read the HTML file
    const htmlPath = path.join(__dirname, '../../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });

  test('should contain doctype declaration', () => {
    expect(htmlContent).toMatch(/<!doctype html>/i);
  });

  test('should have html tag', () => {
    expect(htmlContent).toMatch(/<html/i);
  });

  test('should have head tag', () => {
    expect(htmlContent).toMatch(/<head/i);
  });

  test('should have body tag', () => {
    expect(htmlContent).toMatch(/<body/i);
  });

  test('should have title tag', () => {
    expect(htmlContent).toMatch(/<title>.*<\/title>/i);
  });

  test('should have correct number of script tags', () => {
    const scriptMatches = htmlContent.match(/<script/g);
    expect(scriptMatches).toHaveLength(1);
  });

  test('should have correct number of link tags', () => {
    const linkMatches = htmlContent.match(/<link/g);
    expect(linkMatches.length).toBeGreaterThan(10);
  });

  test('should have correct number of img tags', () => {
    const imgMatches = htmlContent.match(/<img/g);
    expect(imgMatches.length).toBeGreaterThan(15);
  });

  test('should not have href=null attributes', () => {
    expect(htmlContent).not.toMatch(/href="null"/);
  });

  test('should not have duplicate script tags with same src', () => {
    const scriptSrcMatches = htmlContent.match(/<script[^>]*src="[^\"]*"/g);
    const uniqueScripts = [...new Set(scriptSrcMatches)];
    expect(scriptSrcMatches).toHaveLength(uniqueScripts.length);
  });
});

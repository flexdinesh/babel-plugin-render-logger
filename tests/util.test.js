import { getSafeRegexFromConfig } from '../util';

describe('test plugin config', () => {
  test('should match all strings when name opt is not passed', () => {
    const input = '';
    const opts = { name: input };
    const regex = getSafeRegexFromConfig(opts);
    expect('HelloWorld'.match(regex)).toBeTruthy();
    expect('CatsRuleAll'.match(regex)).toBeTruthy();
    expect('KittyPower'.match(regex)).toBeTruthy();
  });

  test('should match component name when name is passed without pattern', () => {
    const input = 'HelloWorld';
    const opts = { name: input };
    const regex = getSafeRegexFromConfig(opts);
    expect('HelloWorld'.match(regex)).toBeTruthy();
    expect('CatsRuleAll'.match(regex)).toBeFalsy();
    expect('KittyPower'.match(regex)).toBeFalsy();
    expect('HelloJackass'.match(regex)).toBeFalsy();
  });

  test('should match component name when name is passed as a pattern', () => {
    const input = 'Hello|Kitty';
    const opts = { name: input };
    const regex = getSafeRegexFromConfig(opts);
    expect('HelloWorld'.match(regex)).toBeTruthy();
    expect('CatsRuleAll'.match(regex)).toBeFalsy();
    expect('KittyPower'.match(regex)).toBeTruthy();
    expect('HelloJackass'.match(regex)).toBeTruthy();
    expect('CatWorld'.match(regex)).toBeFalsy();
  });
});
